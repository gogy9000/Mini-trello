import React, {useState} from "react";
import {Input} from "./Input";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";

import {useDispatch, useSelector} from "react-redux";

import {checkTaskAC} from "./Redux/TaskBlokReducer";


export const Todo = () => {

    let state = useSelector((state: any) => state.stateTaskBlock)

    let dispatch = useDispatch()

    const onCheckHandler = (id: string) => {
        dispatch(checkTaskAC(id))
    }



    return (
        <div className="App">
            <div>
                <h3>What too learn</h3>

                <Input dispatch={dispatch}
                       state={state}
                       newTaskTitle={state.newTaskTitle}/>

                {state.taskFilterMode==='Completed'||'All'&& <TaskBlock tasks={state.activeTasks} callBack={onCheckHandler}/>}
                {state.taskFilterMode==='Active'||'All'&& <TaskBlock tasks={state.completedTasks} callBack={onCheckHandler}/>}

                <ButtonsBlock dispatch={dispatch}/>

            </div>
        </div>
    )
}

