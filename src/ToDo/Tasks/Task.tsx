import {TaskType} from "../../Types";
import React, {useState} from "react";
import {actions} from '../../Redux/ToDoReducer';
import {Checkbox, IconButton} from "@mui/material";
import {CheckCircleOutline, Clear, RadioButtonUnchecked} from "@mui/icons-material";
import {CustomEditSpan} from "../../CustomComponent/CustomEditSpan";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    todoId: string
    task: TaskType
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

        const dispatch = useDispatch()
        const [taskValue, setTaskValue] = useState<string>('')
        const [error, setError] = useState<string>('')

        const checkTask = () => dispatch(actions.checkTaskAC(task.id, todoId))

        const deleteTask = () => dispatch(actions.deleteTaskAC(task.id, todoId))

        const updateTask = () => {
            dispatch(actions.updateTaskAC(todoId, task.id, taskValue.trim()))
            setError('')
        }

        return (
            <div>
                <Checkbox
                    checked={task.isDone}
                    inputProps={{'aria-label': 'controlled'}}
                    icon={<RadioButtonUnchecked/>}
                    checkedIcon={<CheckCircleOutline/>}
                    onChange={checkTask}
                />
                <CustomEditSpan value={taskValue}
                                onClick={updateTask}
                                error={error}
                                setError={setError}
                                onChangeText={setTaskValue}
                                spanProps={{children: !task.title ? undefined : task.title}}
                />
                <IconButton onClick={deleteTask}>
                    <Clear/>
                </IconButton>
            </div>
        )
    }
)