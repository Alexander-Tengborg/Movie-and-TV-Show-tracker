import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'semantic-ui-css/semantic.min.css';
//import 'semantic-ui-css/semantic.darkly.min.css';

import { Provider } from 'react-redux';

import store from './store';


import App from './App';


//USE PROPTYPES!


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
