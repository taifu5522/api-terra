import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from  './Redux/Store/store.js';
import Router from './routes/router.jsx';




render(
  <Provider store={store}>
    <Router />
  </Provider>,
   document.getElementById('app')
);

// import React from 'react';
// import Router from './routes/router.jsx';

// export default class App extends React.Component{
//     render(){
//         return (
//             <div>
//                 <Router />
//             </div>
//         )
//     }
// }