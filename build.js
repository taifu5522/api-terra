// 公共库
import React, { Component } from 'react';
import { render } from 'react-dom';
import {createStore, combineReducers} from 'redux';

// 工具类
import { publicObj } from './script/public/publics';
import store from './script/Redux/Store/store';

// 组件类
var states;
store.subscribe(() => {
    states = store.getState();
    // console.log(states); //解除注释以跟踪状态
});

class CountNumber extends Component{
    constructor(props){
        super(props);
        this.state = {num:0};
    }

    CountNumberFun(action, index){
        store.dispatch(action);
        this.setState({num:states.addNumber});
    }

    render(){
        return (
            <div>
                <p>{this.state.num}</p>
                <a onClick={this.CountNumberFun.bind(this, {type:"add"})} href="javascript:;">加</a> or 
                <a onClick={this.CountNumberFun.bind(this, {type:"remove"})} href="javascript:;">减</a>
            </div>
        )
    }
}

render(<CountNumber />, document.getElementById('body'));