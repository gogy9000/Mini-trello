import React from "react";
import {Task1Type} from "./index";
import {Input} from "./Input";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";

export type TodoPropsType = {
    task1: Array<Task1Type>


}
export const Todo = (props: TodoPropsType) => {

    return (
        <div className="App">
            <div>
                <h3>What too learn</h3>
                <Input/>
                <TaskBlock type={props.task1[0].type}
                           checked={props.task1[0].checked}/>
                <ButtonsBlock/>
            </div>
        </div>
    )
}

