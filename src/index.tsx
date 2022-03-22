import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


export let task1=[
{type :"checkbox", checked: false},
]
export type Task1Type={
    type: string
    checked: boolean
}
export let task2=[
    {type :"checkbox", checked: true},
]
export type Task2Type={
    type: string
    checked: boolean
}



ReactDOM.render(<App task1={task1}  task2={task2}  />,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
