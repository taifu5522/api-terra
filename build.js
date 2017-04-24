// 公共库
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//页面
import App from './script/app.jsx';

//store
import store from './script/Redux/Store/store';

render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('app'));
