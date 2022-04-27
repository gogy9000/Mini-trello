import React, {useState} from "react";
import {Task1Type, TaskBlockType} from "./Types";

import {deleteTaskAC, updateTaskAC} from "./Redux/ToDoReducer";
import {CustomInput} from "./CustomInput";
import {CustomButton} from "./CustomButton";
import {CustomEditSpan} from "./CustomEditSpan";


export const TaskBlock = (props: TaskBlockType) => {
    const [taskValue, setTaskValue] = useState<string>('')


    const updateTask = (idTask: string, idTitle: string) => {

        props.dispatch(updateTaskAC(idTitle, idTask, taskValue))

    }


    const checkTask = (id: string, idTitle: string) => {
        props.callBack(id, idTitle)
    }

    const deleteTask = (id: string, idTitle: string) => {
        props.dispatch(deleteTaskAC(id, idTitle))
    }

    const mapTasks = props.tasks.map((taskElem: Task1Type) => {



            return (
                <li key={taskElem.id}>

                    <input type='checkbox'
                           defaultChecked={taskElem.isDone}
                           onClick={() => {
                               checkTask(taskElem.id, props.idTitle)
                           }}
                    />

                    <CustomEditSpan value={taskValue}
                                    onBlur={() => {
                                        updateTask(taskElem.id, props.idTitle)
                                    }}
                                    onChangeText={(text) => {
                                        setTaskValue(text)
                                    }}
                                    spanProps={{children:!taskElem.title? undefined : taskElem.title}}/>
                    <CustomButton onClick={() => {
                        deleteTask(taskElem.id, props.idTitle)
                    }}>
                        remove task
                    </CustomButton>
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
