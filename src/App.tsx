import React from 'react';
import './App.css';
import {Task1Type, Task2Type} from "./index";
import {Todo} from "./Todo";

export type AppPropsType = {
    task1: Task1Type[]
    task2: Task2Type[]
}


function App(props: AppPropsType) {
    return (
        <div>
            <Todo task1={props.task1}/>
            <Todo task1={props.task2}/>
        </div>

    );
}

export default App;


