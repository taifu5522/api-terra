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
        this.props.typeChange(this.props.getKeys,e.key)
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
    addGlobField(val){
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
            data:Object.assign({},this.state.state,data)
        }))
        this.refs['val'].refs['input'].value = '';
    }
    getKeyName(name,targetKey){
        let names = name.split(':');
        let keyName = names.length > 1 ? `${names[0]}.val` : (targetKey || names[0]);
        names.map((item,i)=>{
            if(i){
                if(i < names.length - 1){
                    keyName += targetKey ? targetKey : item == '-' ? `.val` : `.${item}.val`;
                }else{
                    keyName += targetKey ? targetKey : item == '-' ? `` : `.${item}`;
                }
            }
        })
        return keyName;
    }
    /**
     * 删除字段
     * @param {字段索引} key 
     * @param {数据} data 
     */
    deleteData(key,data){
        let fnbody = `
            delete data.${key};
            return data;
        `;
        let FUN = new Function('data',fnbody);
        return FUN.call(this,data);
    }
    deleteField(name){
        let keyName = this.getKeyName(name);
        let data = this.deleteData(keyName,this.state.data)
        this.setState(Object.assign({},this.state,{
            data:data
        }))
    }
    //////////////////////////////////////////////////////////////////////
    /**
     * 修改字段名称
     * @param {字段索引} key 
     * @param {新名称} newKey 
     * @param {数据} data 
     */
    changeKey(key,newKey,data){
        let fnbody = `
            let oldData = data.${key};
            delete data.${key};
            data.${newKey} = {
                type:oldData.type || 'Null',
                val:oldData.val || null
            }
            return data;
        `;
        let FUN = new Function('data',fnbody);
        return FUN.call(this,data);
    }
    /**
     * 修改字段类型
     * @param {字段索引} key 
     * @param {字段类型} type 
     * @param {数据} data 
     */
    changeType(key,type,data){
        let fnbody = `
            let obj = {
                a:{type:'Null'}
            }
            let arr = {type:'Null'}
            data.${key} = {
                type:type,
                val:(type === 'Object' ? obj : type === 'Array' ? arr : null)
            }
            return data;
        `;
        let FUN = new Function('data','type',fnbody);
        return FUN.call(this,data,type)
    }
    fieldChange(e,name,type){
        if(test.isType(e,'String') && !type){
            type = name;
            name = e;
            e = null;
        };
        let data = this.state.data;
        //let names = name.split(':');
        let datakey = this.getKeyName(name);
        let changeName = this.getKeyName(name,(e ? `${e.target.value}` : 'a'));
        let isChangeName = e ? true : false;
        let newData = null;
        if(isChangeName){//改名字
            newData = this.changeKey(datakey,changeName,this.state.data);
        }else{//改类型
            newData = this.changeType(datakey,type,this.state.data);
        }
        this.setState(Object.assign({},this.state,{
            data:newData
        }))
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 增加字段
     * @param {字段索引} key 
     * @param {新增字段名} newKey 
     * @param {数据} data 
     */
    addField(key,newKey,data){
        let fnbody = `
            data.${key}.val['${newKey}'] = {
                type:'Null'
            }
            return data;
        `;
        let FUN = new Function('data',fnbody);
        return FUN.call(this,data);
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
        let keyName = this.getKeyName(key);
        let data = this.addField(keyName, newKeyName, this.state.data);
        this.setState(Object.assign({},this.state,{
            data:data
        }))
    }
    ////////////////////////////////////////////////////////////////////////////////
    typeChange(name,val){
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
            typeChange={(name,val)=>{this.typeChange(name,val)}} 
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
                    <Button onClick={()=>{this.addGlobField(this.refs['val'].refs['input'].value)}}>增加字段</Button>
                    <Button onClick={()=>{this.submitApi()}}>提交接口</Button>
                </div>
            </div>
        )
    }
}

