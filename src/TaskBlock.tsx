import React from "react";
import {Task1Type, TaskBlockType} from "./Types";

import {deleteTaskAC} from "./Redux/ToDoReducer";






export const TaskBlock = (props: TaskBlockType) => {

    const checkTask = (id:string,idTitle:string) => {
        props.callBack(id,idTitle)
    }

    const deleteTask = (id:string,idTitle:string) => {
        props.dispatch(deleteTaskAC(id,idTitle))
    }

    const mapTasks= props.tasks.map((taskElem: Task1Type) => {



            return (
                <li key={taskElem.id}>
                    <input type='checkbox'
                           checked={taskElem.isDone}
                           onClick={()=>{checkTask(taskElem.id,props.idTitle)}}
                    />
                    <span>{taskElem.title}</span>
                    <button onClick={()=>{deleteTask(taskElem.id,props.idTitle)}}>x</button>
                </li>
            )
        }
    )

    return (
        <div>
            <ul>
                {mapTasks}
            </ul>


        </div>

    )
}