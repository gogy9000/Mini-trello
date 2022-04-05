import React from "react";
import {Task1Type, TaskBlockType} from "./Types";
import {checkTaskAC} from "./Redux/TaskBlokReducer";


export const TaskBlock = (props: TaskBlockType) => {


    return (
        <div>
            <ul>

                {props.tasks.map((taskElem: Task1Type) => {

                        const checkTask = () => {
                            props.callBack(taskElem.id)

                        }
                        return (
                            <div key={taskElem.id}>
                                <li>
                                    <input type='checkbox' checked={taskElem.isDone} onClick={checkTask}/>
                                    <span>{taskElem.title}</span>
                                </li>
                            </div>)
                    }
                )}
            </ul>
        </div>

    )
}