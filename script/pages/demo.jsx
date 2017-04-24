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
        this.props.changeVal(this.props.name,e.key)
    }
    componentDidUpdate(){

    }
    render(){
        return (
            <Col style={{marginTop:10}}>
                字段:<Input style={{width:100}} defaultValue={this.props.name} onChange={(e)=>{this.props.onChange(e,this.props.name,this.props.type)}} />
                <br />
                类型:<Dropdown.Button overlay={this.menu}>
                        {
                            this.props.type
                        }
                    </Dropdown.Button>
                <Button onClick={()=>{this.props.deleteField(this.props.name)}}>删除字段</Button>
            </Col>
        )
    }
}

export default class Demo extends React.Component {
    constructor(props){
        super(props)
        this.state = {  
            eidt:false,
            data:{

            }
        }
    }
    deleteField(name){
        let data = this.state.data;
        delete data[name];
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
        data[val] = 'Null';
        this.setState(Object.assign({},this.state,{
            data:Object.assign({},this.state.data,data)
        }),()=>{
            this.refs['val'].refs['input'].value = "";
        })
    }
    fieldChange(e,name,type){
        if(test.isType(e,'String') && !type){
            type = name;
            name = e;
            e = null;
        }
        let data = this.state.data;
        if(e){
            delete data[name];
            data[e.target.value] = type || 'Null';
        }else{
            data[name] = type;
        }
        this.setState(Object.assign({},this.state,{
            data:data
        }),()=>{
            console.log(this.state.data)
        })
    }
    changeVal(name,val){
        this.fieldChange(name,val)
    }
    getEidt(name,isObj){
        if(name === 'Object'){
            return this.getEidt()
        }
        return (<Item 
        type={this.state.data[item]} 
        changeVal={(name,val)=>{this.changeVal(name,val)}} 
        onChange={(e,name,type)=>{this.fieldChange(e,name,type)}} 
        data={this.state.data[item]} 
        name={item} 
        deleteField={(n)=>{this.deleteField(n)}}
        key={Date.now()+Math.random()} />)
    }
    render(){
        let n = 0;
        return (
            <div style={{padding:20}}>
                <Button onClick={()=>{this.setState(Object.assign({},this.state,{eidt:true}))}}>新增接口</Button>

                <div style={{display:(!this.state.eidt ? 'block' : 'none'),marginTop:20}}>
                    <Row>
                        {
                            Object.keys(this.state.data).map((item)=>{
                                return this.getEidt(item);
                            })
                        }
                    </Row>
                    <Input style={{marginTop:20,width:100}} ref="val" />
                    <Button onClick={()=>{this.addField(this.refs['val'].refs['input'].value)}}>增加字段</Button>
                </div>
            </div>
        )
    }
}

