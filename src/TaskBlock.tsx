import React from "react";
import {Task1Type, TaskBlockType} from "./Types";
import {CustomButton} from "./ButtonsBlock";
import {deleteTaskAC} from "./Redux/TaskBlokReducer";

// @ts-ignore
import {v1} from 'uuid'



export const TaskBlock = (props: TaskBlockType) => {

    const checkTask = (id:string) => {
        props.callBack(id)
    }

    const deleteTask = (id:string) => {
        props.dispatch(deleteTaskAC(id))
    }

    const mapTasks= props.tasks.map((taskElem: Task1Type) => {



            return (
                <li key={v1()}>
                    <input type='checkbox'
                           checked={taskElem.isDone}
                           onClick={()=>{checkTask(taskElem.id)}}
                    />
                    <span>{taskElem.title}</span>
                    <button onClick={()=>{deleteTask(taskElem.id)}}>*</button>
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