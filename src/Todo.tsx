import React from "react";
import {Input} from "./Input";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";
import {TodoPropsType} from "./Types";

export const Todo = (props: TodoPropsType) => {

    return (
        <div className="App">
            <div>
                <h3>What too learn</h3>
                <Input/>
                <TaskBlock tasks={props.tasks}/>
                <ButtonsBlock/>
            </div>
        </div>
    )
}

