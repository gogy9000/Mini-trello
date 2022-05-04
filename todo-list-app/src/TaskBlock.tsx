import React, {useState} from "react";
import {Task1Type, TaskBlockType} from "./Types";

import {deleteTaskAC, updateTaskAC} from "./Redux/ToDoReducer";
import {CustomInput} from "./CustomInput";
import {CustomButton} from "./CustomButton";
import {CustomEditSpan} from "./CustomEditSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Check, Clear, Create} from "@mui/icons-material";


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
                <div key={taskElem.id}>

                    {/*<input type='checkbox'*/}
                    {/*       defaultChecked={taskElem.isDone}*/}
                    {/*       onClick={() => {*/}
                    {/*           checkTask(taskElem.id, props.idTitle)*/}
                    {/*       }}*/}
                    {/*/>*/}
                    <Checkbox
                        checked= {taskElem.isDone}
                        icon={<Check />}
                        checkedIcon={<Check />}
                        onClick={() => {
                            checkTask(taskElem.id, props.idTitle)
                        }}
                    />
                    <CustomEditSpan value={taskValue}
                                    onBlur={() => {
                                        updateTask(taskElem.id, props.idTitle)
                                        setTaskValue('')
                                    }}
                                    onChangeText={(text) => {
                                        setTaskValue(text)
                                    }}
                                    spanProps={{children:!taskElem.title? undefined : taskElem.title}}/>

                    <IconButton onClick={() => {
                        deleteTask(taskElem.id, props.idTitle)
                    } }><Clear/></IconButton>

                </div>
            )
        }
    )

        return (
            <div>
                <div>
                    {mapTasks}
                </div>


            </div>

        )
    }
