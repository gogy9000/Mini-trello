import {Task1Type} from "../../Types";
import React, {useState} from "react";
import {actions} from '../../Redux/ToDoReducer';
import {Checkbox, IconButton} from "@mui/material";
import {
    CheckCircleOutline,
    Clear, RadioButtonUnchecked
} from "@mui/icons-material";
import {CustomEditSpan} from "../../CustomComponent/CustomEditSpan";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    idTitle: string
    taskElem: Task1Type

}
 const TaskMemo: React.FC<TaskPropsType> = ({  taskElem, idTitle}) => {
    const dispatch= useDispatch()
    const [taskValue, setTaskValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const checkTask = (id: string, idTitle: string) => {
        dispatch(actions.checkTaskAC(id, idTitle))
    }

    const deleteTask = (id: string, idTitle: string) => {
        dispatch(actions.deleteTaskAC(id, idTitle))
    }

    const updateTask = (idTask: string, idTitle: string) => {

        dispatch(actions.updateTaskAC(idTitle, idTask, taskValue.trim()))
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
export const Task=React.memo(TaskMemo)