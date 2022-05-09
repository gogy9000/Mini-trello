import {Task1Type} from "./Types";
import React, {useState} from "react";
import {deleteTaskAC, updateTaskAC} from "./ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {Checkbox, IconButton} from "@mui/material";
import {
    CheckCircleOutline,
    Clear, RadioButtonUnchecked
} from "@mui/icons-material";
import {CustomEditSpan} from "./CustomEditSpan";

export type TaskPropsType = {
    callBack: (id: string, idTitle: string) => void
    dispatch: (action: any) => void
    idTitle: string
    taskElem: Task1Type

}
export const Task: React.FC<TaskPropsType> = ({callBack, dispatch, taskElem, idTitle}) => {

    const [taskValue, setTaskValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const checkTask = (id: string, idTitle: string) => {
        callBack(id, idTitle)
    }

    const deleteTask = (id: string, idTitle: string) => {
        dispatch(deleteTaskAC(id, idTitle))
    }

    const updateTask = (idTask: string, idTitle: string) => {

        dispatch(updateTaskAC(idTitle, idTask, taskValue.trim()))
        setError('')
    }

    return (
        <div key={taskElem.id}>
            <Checkbox
                checked={taskElem.isDone}
                inputProps={{ 'aria-label': 'controlled' }}
                icon={<RadioButtonUnchecked/>}
                checkedIcon={<CheckCircleOutline/>}
                onChange={() => {
                    checkTask(taskElem.id, idTitle)
                }}
            />
            <CustomEditSpan value={taskValue}
                            onClick={() => {
                                updateTask(taskElem.id, idTitle)
                            }}
                            error={error}
                            setError={setError}
                            onChangeText={(text) => {
                                setTaskValue(text)
                            }}
                            spanProps={{children: !taskElem.title ? undefined : taskElem.title}}/>

            <IconButton onClick={() => {
                deleteTask(taskElem.id, idTitle)
            }}><Clear/></IconButton>
        </div>
    )
}