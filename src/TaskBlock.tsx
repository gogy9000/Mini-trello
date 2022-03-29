import React from "react";
import {Task1Type, Task2Type, TaskBlockType} from "./Types";

export const TaskBlock = (props: TaskBlockType) => {
    console.log(props.tasks)
    return (
        <div>
            <ul>
                {props.tasks.map((taskElem: Task1Type | Task2Type) =>
                    <li>
                        <input type='checkbox' checked={taskElem.isDone}/>
                        <span>{taskElem.title}</span>
                    </li>
                )}
            </ul>
        </div>

    )
}