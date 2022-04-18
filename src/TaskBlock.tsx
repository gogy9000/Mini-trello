import React from "react";
import {Task1Type, TaskBlockType} from "./Types";



export const TaskBlock = (props: TaskBlockType) => {
    console.log(props.tasks)





    return (
        <div>
            <ul>

                {props.tasks.map((taskElem: Task1Type) => {

                        const checkTask = () => {
                            props.callBack(taskElem.id)

                        }
                        return (

                                <li key={taskElem.id}>
                                    <input type='checkbox' checked={taskElem.isDone} onClick={checkTask} />
                                    <span>{taskElem.title}</span>
                                </li>
                            )
                    }
                )}
            </ul>


        </div>

    )
}