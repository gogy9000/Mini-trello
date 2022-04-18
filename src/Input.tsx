import React from "react";
import './App.css';
import {InputPropsType} from "./Types";
import {addTaskAC, ChangeTextTaskTitleAC, errorInputResetAC} from "./Redux/TaskBlokReducer";


export const Input = (props: InputPropsType) => {


    const addTask = () => {

      props.dispatch(addTaskAC())
    }
    const ChangeTextTaskTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        props.dispatch(ChangeTextTaskTitleAC(e.currentTarget.value))
    }
    const onclickHandler = () => {
        props.dispatch(errorInputResetAC())
    }

    return (
        <div className={props.state.errorInput?'error':'notError'}>
            <input onChange={ChangeTextTaskTitle} value={props.newTaskTitle}
            onClick={onclickHandler}/>
            <button onClick={addTask}>add</button>
            {props.state.errorInput&&<div >field is empty</div>}
        </div>
    )
}