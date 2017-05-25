/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-02 00:01:55
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: app.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 11:19:19
 */



import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from  './redux/store/store.js';
import Router from './routes/router.jsx';

render(
  <Provider store={store}>
    <Router />
  </Provider>,
   document.getElementById('app')
);
