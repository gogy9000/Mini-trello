import React from 'react';
import './App.css';
import {Task1Type, Task2Type} from "./index";

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


export type TodoPropsType = {
    task1: Array<Task1Type>


}

export const Todo = (props: TodoPropsType) => {
    console.log(props)
    return (
        <div className="App">
            <div>
                <h3>What too learn</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type={props.task1[0].type} checked={props.task1[0].checked}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}
