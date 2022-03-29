import React from "react";
import {Input} from "./Input";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";

import {useDispatch, useSelector} from "react-redux";

export const Todo = () => {

    let state = useSelector((state: any) => state)
    let dispatch = useDispatch()
    console.log(state)

    return (
        <div className="App">
            <div>
                <h3>What too learn</h3>

                <Input dispatch={dispatch}
                       state={state}/>

                <TaskBlock tasks={state.stateTaskBlock.tasks}
                           dispatch={dispatch}/>
                <ButtonsBlock/>
            </div>
        </div>
    )
}

