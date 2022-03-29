import React from "react";
import {InputPropsType} from "./Types";
import {addTaskAC, ChangeTextTaskTitleAC} from "./Redux/TaskBlokReducer";


export const Input = (props: InputPropsType) => {


    const addTask = () => {

      props.dispatch(addTaskAC())
    }
    const ChangeTextTaskTitle = (e:any) => {
        props.dispatch(ChangeTextTaskTitleAC(e.currentTarget.value))
    }

    return (
        <div>
            <input onChange={ChangeTextTaskTitle} value={props.newTaskTitle}/>

            <button onClick={addTask}>+</button>
        </div>
    )
}