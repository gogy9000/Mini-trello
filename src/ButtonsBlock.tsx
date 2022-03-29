import React, {useState} from "react";
import {getActiveTasksAC, getAllTasksAC, getCompletedTasksAC} from "./Redux/TaskBlokReducer";
import {Task1Type} from "./Types";

type ButtonsBlockType={
    dispatch: (action:any) => void
    tasks: Array<Task1Type>
}

export const ButtonsBlock = (props: ButtonsBlockType) => {

    let [localState, setLocalState]= useState([])

    console.log(localState)

    // @ts-ignore
    // setLocalState(localState= props.tasks)

    const onActiveTasks = () => {
      let filteredTask = props.tasks.filter(task=>!task.isDone)
        // @ts-ignore
        setLocalState(localState.concat(filteredTask))

    }
    const onCompletedTasks=()=>{
        props.dispatch(getCompletedTasksAC())
    }
    const onAllTasks = () => {
      props.dispatch(getAllTasksAC())
    }

    return (
        <div>
            <button onClick={onAllTasks}>All</button>
            <button onClick={onActiveTasks}>Active</button>
            <button onClick={onCompletedTasks}>Completed</button>
        </div>
    )
}