import React, {Component} from 'react';

import '../css/antd.min.css';

import {  
    Input,
    Button,
    Tree,
    Row,
    Col,
    Menu,
    Dropdown,
    message
} from 'antd';

import publics from '../public/publics';

let test = new publics();

class Item extends Component {
    constructor(props){
        super(props);
        this.menu = (
                <Menu onClick={(e)=>{this.clickHandle(e)}}>
                    <Menu.Item key="String">String</Menu.Item>
                    <Menu.Item key="Number">Number</Menu.Item>
                    <Menu.Item key="Boolean">Boolean</Menu.Item>
                    <Menu.Item key="Array">Array</Menu.Item>
                    <Menu.Item key="Object">Object</Menu.Item>
                    <Menu.Item key="Null">Null</Menu.Item>
                </Menu>
            );
    }
    clickHandle(e){
        this.props.changeType(this.props.getKeys,e.key)
    }
    componentDidUpdate(){

    }
    render(){
        return (
            <Col style={{marginTop:10}} offset={this.props.offset}>
                字段:{
                    !this.props.name ? null : (
                    <Input style={{width:100}}
                    defaultValue={this.props.name}
                    onChange={(e)=>{this.props.onChange(e,this.props.getKeys,this.props.type)}}
                    disabled={!this.props.name}
                    />
                    )
                }
                <br />
                类型:<Dropdown.Button overlay={this.menu}>
                        {
                            this.props.type
                        }
                    </Dropdown.Button>
                {
                    !this.props.name ? null : 
                    <Button onClick={()=>{this.props.deleteField(this.props.getKeys)}}>
                        删除字段
                    </Button>
                }
                {
                    this.props.type == 'Object' ? <Button onClick={()=>{this.props.addItemFiled(this.props.getKeys)}}>增加字段</Button> : null
                }
                {
                    this.props.children
                }
            </Col>
        )
    }
}

export default class Demo extends React.Component {
    constructor(props){
        super(props)
        this.state = {  
            eidt:false,
            data:{}
        }
    }
    deleteField(name){
        let names = name.split(':');
        let keyName = names.length > 1 ? `${names[0]}.val` : names[0];
        names.map((item,i)=>{
            if(i){
                if(i < names.length - 1){
                    keyName += item == '-' ? `.val` : `.${item}.val`;
                }else{
                    keyName += item == '-' ? `` : `.${item}`
                }
            }
        })
        let fnbody = `
            let data = this.state.data;
            delete data.${keyName};
            return data;
        `;
        let FUN = new Function(fnbody);
        let data = FUN.call(this);
        this.setState(Object.assign({},this.state,{
            data:data
        }))
    }
    addField(val){
        if(!val) return message.error('请输入正确的字段名称!');
        if(this.state.data[val]){
            message.info('字段已存在！');
            return;
        }
        let data = {};
        data[val] = {
            type:'Null'
        };
        this.setState(Object.assign({},this.state,{
            data:Object.assign({},this.state.data,data)
        }))
        this.refs['val'].refs['input'].value = '';
    }
    deep(obj,names){
        console.log(names)
    }
    fieldChange(e,name,type){
        if(test.isType(e,'String') && !type){
            type = name;
            name = e;
            e = null;
        };
        let data = this.state.data;
        let names = name.split(':');
        //this.deep(this.state.data,names)
        let isChangeName = e ? true : false;
        let changeData = e;
        let newData = null;
        if(!names.length){
            return message.error('请输入正确的字段!');
        }
        let datakey = names.length > 1 ? `${names[0]}.val` : `${names[0]}`;
        let changeName = names.length > 1 ? `${names[0]}.val` : `${e.target.value}`;
        names.map((item,i)=>{
            if(i){
                if(i < names.length - 1){
                    datakey += item == '-' ? `.val` : `.${item}.val`;
                    changeName += item == '-' ? `.val` : `.${item}.val`;
                }else{
                    changeName += e ? `.${e.target.value}` : '';
                    datakey += item == '-' ? `` : `.${item}`
                }
            }
        })
        let fnbody = `
            let data = this.state.data;
            let obj = {
                a:{type:'Null'}
            }
            let arr = {type:'Null'}
            if(${isChangeName}){//改名字
                let oldData = data.${datakey};
                delete data.${datakey};
                data.${changeName} = {
                    type:type || 'Null',
                    val:oldData.val || null
                }
            }else{//改类型
                data.${datakey} = {
                    type:type,
                    val:(type === 'Object' ? obj : type === 'Array' ? arr : null)
                };
            }
            return data;
        `;
        try{
            let FUN = new Function('e','type',fnbody);
            newData = FUN.call(this,e,type);

        }catch(e){
            return message.error('请输入正确的字段名称！');
        }
        this.setState(Object.assign({},this.state,{
            data:newData
        }))
    }
    addItemFiled(key){
        function diag(){
            var str=prompt("请输入字段名");
            return str;
        }
        let newKeyName = diag();
        if(!newKeyName){
            message.error('请输入正确的字段名!')
            return;
        }
        let names = key.split(':');
        let keyName = names.length > 1 ? `${names[0]}.val` : names[0];
        names.map((item,i)=>{
            if(i){
                if(i < names.length - 1){
                    keyName += item == '-' ? `.val` : `.${item}.val`;
                }else{
                    keyName += item == '-' ? `` : `.${item}`
                }
            }
        })

        let fnbody = `
            let data = this.state.data;
            data.${keyName}.val['${newKeyName}'] = {
                type:'Null'
            }
            return data;
        `;
        let FUN = new Function(fnbody);
        let data = FUN.call(this);
        this.setState(Object.assign({},this.state,{
            data:data
        }))
    }
    changeType(name,val){
        this.fieldChange(name,val)
    }
    getEidt(obj,name,n){
        n = n || 0;
        let arg = arguments['4'] ? `${arguments[3]}:${arguments[4]}` : arguments['3'] ? arguments['3'] : name;
        return (
            <Item
            getKeys={arg}
            offset={n}
            type={obj.type} 
            changeType={(name,val)=>{this.changeType(name,val)}} 
            onChange={(e,name,type)=>{this.fieldChange(e,name,type)}} 
            data={obj} 
            name={name} 
            deleteField={(n)=>{this.deleteField(n)}}
            addItemFiled={(key)=>{this.addItemFiled(key)}}
            key={Date.now()+Math.random()}>
            {
                obj.type === 'Object' ? Object.keys(obj.val).map((key)=>{
                    return this.getEidt(obj.val[key],key,1,arg,key);
                }) : obj.type === 'Array' ? this.getEidt(obj.val,null,1,arg,'-') : null
            }
            </Item>
        )
    }
    submitApi(){
        let name = this.refs['apiName'].refs['input'].value;
        if(!name){return message.error('请输入接口名称!')};
        let api = {
            name:name,
            data:this.state.data
        }
        console.log(api)
    }
    render(){
        let n = 0;
        return (
            <div style={{padding:20}}>
                <Button onClick={()=>{this.setState(Object.assign({},this.state,{eidt:true}))}}>新增接口</Button>
                <div style={{display:(this.state.eidt ? 'block' : 'none'),marginTop:20}}>
                    接口名称:<Input style={{width:500}} type="text" ref="apiName" />
                    <Row>
                        {
                            Object.keys(this.state.data).map((item)=>{
                                return this.getEidt(this.state.data[item],item);
                            })
                        }
                    </Row>
                    <Input style={{marginTop:20,width:100}} ref="val" />
                    <Button onClick={()=>{this.addField(this.refs['val'].refs['input'].value)}}>增加字段</Button>
                    <Button onClick={()=>{this.submitApi()}}>提交接口</Button>
                </div>
            </div>
        )
    }
}
