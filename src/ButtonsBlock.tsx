import React, {useState} from "react";
import {Task1Type} from "./Types";
import {getAllTasksAC} from "./Redux/TaskBlokReducer";

type ButtonsBlockType={
    // dispatch: (action:any) => void
    // tasks: Array<Task1Type>
    callBack:(action:string)=>void
    // onAllTasks:()=>void
    // onActiveTasks:()=>void
    // onCompletedTasks:()=>void
}

export const ButtonsBlock:React.FC<ButtonsBlockType> = (
    props) => {

    const onActiveTasks = () => {
        props.callBack('Active')

    }
    const onCompletedTasks=()=>{
        props.callBack('Completed')

    }
    const onAllTasks = () => {
        props.callBack('all')

    }


    return (
        <div>
            <button onClick={onAllTasks}>All</button>
            <button onClick={onActiveTasks}>Active</button>
            <button onClick={onCompletedTasks}>Completed</button>
        </div>
    )
}