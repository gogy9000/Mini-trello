import React from "react";
import './App.css';
import {useSelector} from "react-redux";
import {taskTitle} from "./Types";
import {ToDo} from "./ToDo";


export const ToDos = () => {



    let state = useSelector((state:any) => state.stateTaskBlock)

    const todos = state.tasksTitle.map((task: taskTitle) => <ToDo key={task.id} task={task} state={state}/>)

    return (
        <div className="App">{todos}</div>
    )
}

