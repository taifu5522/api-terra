/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-26 11:15:45
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: router.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-04-27 17:16:21
 */



import React from 'react';

//router
import { Router, Route, Link, hashHistory } from 'react-router';

import Demo from '../pages/demo.jsx';
import Login from '../pages/user/login.jsx';


export default class Routers extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Demo}/>
                <Route path="/login" component={Login}/>
            </Router>
        )
    }
}
