import React, {useState} from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {taskTitle} from "./Types";
import {ToDo} from "./ToDo";
import {createNewTodoAC} from "./Redux/ToDoReducer";


export const ToDos = () => {
    let state = useSelector((state:any) => state.stateTaskBlock)
    let dispatch=useDispatch()

    let [todoName, setTodoName]= useState<string>('noName')

    const onclickHandler = () => {
      dispatch(createNewTodoAC(todoName))
    }


    const todos = state.tasksTitle.map((task: taskTitle) => <ToDo key={task.id} task={task} state={state}/>)

    return (
        <div className="App">
            <div><button onClick={onclickHandler}>new todo</button></div>

            <span>{todos}</span>


        </div>
    )
}

