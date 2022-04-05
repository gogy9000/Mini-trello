import React, {useState} from "react";
import {Input} from "./Input";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";

import {useDispatch, useSelector} from "react-redux";
import {Task1Type} from "./Types";
import {checkTaskAC, getActiveTasksAC, getAllTasksAC, getCompletedTasksAC} from "./Redux/TaskBlokReducer";


export const Todo = () => {


    let state = useSelector((state: any) => state.stateTaskBlock)
    console.log(state)
    let dispatch = useDispatch()

        const onCheckHandler = (id:number)=>{
            dispatch(checkTaskAC(id))
        }





    const onButtonHandler = (action: string) => {


    }

    return (
        <div className="App">
            <div>
                <h3>What too learn</h3>

                <Input dispatch={dispatch}
                       state={state}
                       newTaskTitle={state.newTaskTitle}/>

                <TaskBlock tasks={state.activeTasks}
                           callBack={onCheckHandler}
                           />
                <TaskBlock tasks={state.completedTasks}
                           callBack={onCheckHandler}/>

                <ButtonsBlock
                    // dispatch={dispatch}
                    //           tasks={state.tasks}
                              callBack={onButtonHandler}

                />

            </div>
        </div>
    )
}

