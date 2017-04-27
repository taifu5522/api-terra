import React, {Component} from 'react';
import data from 'common/data-store';

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
        this.state = {
            getKeys:this.props.getKeys
        }
        this.menu = (
                <Menu onClick={(e)=>{this.clickHandle(e)}}>
                    <Menu.Item key="String">String</Menu.Item>
                    <Menu.Item key="Number">Number</Menu.Item>
                    <Menu.Item key="Boolean">Boolean</Menu.Item>
                    <Menu.Item key="Array">Array</Menu.Item>
                    <Menu.Item key="Object">Object</Menu.Item>
                    <Menu.Item key="Null">Null</Menu.Item>
                    <Menu.Item key="Phone">Phone</Menu.Item>
                    <Menu.Item key="Email">Email</Menu.Item>
                </Menu>
            );
    }
    clickHandle(e){
        this.props.typeChange(this.state.getKeys,e.key)
    }
    changeName(e){
        let newKey = this.props.onChange(e,this.state.getKeys,this.props.type);
        this.setState(Object.assign({},this.state,{
            getKeys:newKey
        }));
    }
    render(){
        return (
            <Col style={{marginTop:10}} offset={this.props.offset}>
                字段:{
                    test.isType(this.props.name,'Null') ? null : (
                    <Input style={{width:100}}
                    defaultValue={this.props.name}
                    onChange={(e)=>{this.changeName(e)}}
                    disabled={test.isType(this.props.name,'Null')}
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
                    test.isType(this.props.name,'Null') ? null : 
                    <Button onClick={()=>{this.props.deleteField(this.state.getKeys)}}>
                        删除字段
                    </Button>
                }
                {
                    this.props.type == 'Object' ? <Button onClick={()=>{this.props.addItemFiled(this.state.getKeys)}}>增加字段</Button> : null
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
        this.dataStore = new data.dataStore();
        this.state = {  
            eidt:false,
            data:this.dataStore.getData()
        }
    }
    getKeyName(name,targetKey){
        let names = name.split(':');
        let keyName = names.length > 1 ? `${names[0]}.val` : (targetKey || names[0]);
        names.map((item,i)=>{
            if(i){
                if(i < names.length - 1){
                    keyName += item == '-' ? `.val` : `.${item}.val`;
                }else{
                    keyName += targetKey ? targetKey : item == '-' ? `` : `.${item}`;
                }
            }
        })
        return keyName;
    }
    addGlobField(val){
        if(!val) return message.error('请输入正确的字段名称!');
        if(this.state.data[val]){
            message.info('字段已存在！');
            return;
        }
        this.dataStore.add(val,{
            type:'Null'
        })
        this.setState(Object.assign({},this.state,{
            data:this.dataStore.getData()
        }))
        this.refs['val'].refs['input'].value = '';
    }
    deleteField(name){
        let keyName = this.getKeyName(name);
        this.dataStore.delete(keyName);
        this.setState(Object.assign({},this.state,{
            data:this.dataStore.getData()
        }))
    }
    ////////////////////////////////////////////////////////////////////////////////
    /**
     * 修改字段名称
     * @param {字段索引} key 
     * @param {新名称} newKey 
     */
    changeKey(key,newKey){
        let changeKey = newKey.split(':').pop();
        let keys = key.split(':');
        keys.pop();
        keys.push(changeKey);
        let oldData = Object.assign({},this.dataStore.findKey(key));
        this.dataStore.delete(key);
        this.dataStore.add(keys.join(':'),oldData)
        let newKeyName = newKey.replace(/\.val\.val/g,'-').replace(/\.val/g,'');
        newKeyName = newKeyName.split('.').join(':').split('-').join(':-');
        return newKeyName;
    }
    /**
     * 修改字段类型
     * @param {字段索引} key 
     * @param {字段类型} type 
     */
    changeType(key,type){
        let obj = {
            a:{type:'String'}
        }
        let arr = {type:'String'}
        this.dataStore.update(key,{
            type:type,
            val:(type === 'Object' ? obj : type === 'Array' ? arr : null)
        })
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
        let changeName = this.getKeyName(name,(e ? `.${e.target.value}` : 'a'));
        if(e){//改名字
            return this.changeKey(datakey,changeName);
        }else{//改类型
            this.changeType(datakey,type);
            this.setState(Object.assign({},this.state,{
                data:this.dataStore.getData()
            }))
        }
    }
    ////////////////////////////////////////////////////////////////////////////////
    /**
     * 增加字段
     * @param {字段索引} key 
     */
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
        this.dataStore.add(`${keyName}.val.${newKeyName}`,{
            type:'Null'
        });
        this.setState(Object.assign({},this.state,{
            data:this.dataStore.getData()
        }))
    }
    ////////////////////////////////////////////////////////////////////////////////
    getEidt(obj,name,n){
        n = n || 0;
        let arg = arguments['4'] ? `${arguments[3]}:${arguments[4]}` : arguments['3'] ? arguments['3'] : name;
        return (
            <Item
            getKeys={arg}
            offset={n}
            type={obj.type} 
            typeChange={(name,val)=>{this.fieldChange(name,val)}} 
            onChange={(e,name,type)=>{return this.fieldChange(e,name,type)}} 
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
            data:this.dataStore.getData()
        }

        fetch(`/doc/save?api=${JSON.stringify(api)}`).then(res=>res.json()).then(data=>{
            //console.log(data)
        })
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

