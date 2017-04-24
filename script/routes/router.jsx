import React from 'react';

//router
import { Router, Route, Link, hashHistory } from 'react-router';

import Demo from '../pages/demo.jsx';

export default class Routers extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Demo}/>
            </Router>
        )
    }
}

