import {TaskType} from "../../Types";
import React, {useCallback, useState} from "react";
import {actions} from '../../Redux/ToDoReducer';
import {Card, Checkbox, IconButton} from "@mui/material";
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

        const checkTask = useCallback(() => dispatch(actions.checkTaskAC(task.id, todoId)), [dispatch, task.id, todoId])

        const deleteTask = useCallback(() => dispatch(actions.deleteTaskAC(task.id, todoId)), [dispatch, task.id, todoId])

        const updateTask = useCallback(() => {
            dispatch(actions.updateTaskAC(todoId, task.id, taskValue.trim()))
            setError('')
        }, [dispatch, todoId, task.id, taskValue.trim()])

        return (
            <div>
                <Card sx={{maxWidth: 320,flexWrap:"wrap"}}>
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
                </Card>
            </div>
        )
    }
)