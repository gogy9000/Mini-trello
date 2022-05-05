import {taskTitle} from "./Types";
import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Button, TextField} from "@mui/material";

type TaskTitleBlockPropsType = {
    updateTodoMode: boolean
    onUpdateTodoMode: () => void
    task: taskTitle
    setError: Dispatch<SetStateAction<string>>
    todoNameChanger: (e: ChangeEvent<HTMLInputElement>) => void
    todoName: string
    error: string
    updateTodoName: () => void
}
export const TaskTitleBlock: React.FC<TaskTitleBlockPropsType> = ({
                                                                      updateTodoMode,
                                                                      onUpdateTodoMode,
                                                                      task,
                                                                      setError,
                                                                      todoNameChanger,
                                                                      todoName,
                                                                      error,
                                                                      updateTodoName
                                                                  }) => {
    return (
        <>
            {
                !updateTodoMode
                    ?
                    <div onClick={onUpdateTodoMode}>{task.titleName}</div>
                    :
                    <div>
                        <TextField
                            size={'small'}
                            onClick={() => {
                                setError('')
                            }}
                            onChange={todoNameChanger}
                            value={todoName}
                            error={!!error}
                            id="filled-error-helper-text"
                            label={'New task name'}
                            // helperText={updateTodoMode?"Press Enter.":'New task name'}
                            variant="filled"
                        />
                        <Button variant={'outlined'} onClick={updateTodoName} size={'small'}>update</Button>
                    </div>

            }
        </>
    )

}