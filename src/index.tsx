import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./Redux/ReduxStore";

 export let state={
    taskArr1 : [
        {id: 0, title: 'HTML&CSS', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'ReactJS', isDone: true},
        {id: 3, title: 'RestAPI', isDone: true},
        {id: 4, title: 'GraphQL', isDone: true},
    ],
    taskArr2 : [
        {id: 0, title: 'HTML&CSS', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'ReactJS', isDone: true},
        {id: 3, title: 'RestAPI', isDone: true},
        {id: 4, title: 'GraphQL', isDone: true},
    ]}


ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
