import React from "react";
import {Input} from "./Input";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";

import {useDispatch, useSelector} from "react-redux";




export const Todo = () => {

    let state = useSelector((state: any) => state.stateTaskBlock)
    let dispatch = useDispatch()


    return (
        <div className="App">
            <div>
                <h3>What too learn</h3>

                <Input dispatch={dispatch}
                       state={state}
                       newTaskTitle={state.newTaskTitle}/>

                <TaskBlock tasks={state.tasks}
                           dispatch={dispatch}/>

                <ButtonsBlock dispatch={dispatch}/>

            </div>
        </div>
    )
}

