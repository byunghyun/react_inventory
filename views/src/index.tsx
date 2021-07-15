import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style/default/index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, useHistory} from 'react-router-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import ReduxProductLst from './redux/ProductLst';
import ReduxStockLst from './redux/StockLst';
import ReduxHisStockLst from './redux/HisStockLst';
import ReduxWeekData from './redux/WeekData';
import {ReduxSearchVal, ReduxSearchObject} from './redux/SearchVal';

const store = createStore(combineReducers({ReduxProductLst, ReduxStockLst, ReduxHisStockLst, ReduxWeekData, ReduxSearchVal, ReduxSearchObject}));

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
