import {taskTitle} from "./Types";
import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Button, IconButton, Stack, TextField} from "@mui/material";
import {Edit, EditOff} from "@mui/icons-material";

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
                    <Stack direction='row' spacing={1}>
                    <div >{task.titleName}</div>
                    <IconButton onClick={onUpdateTodoMode}><Edit/></IconButton>
                    </Stack>
                    :
                    <Stack direction='row' spacing={1}>
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
                        <IconButton  onClick={updateTodoName} size={'small'}><EditOff/></IconButton>
                    </Stack>

            }
        </>
    )

}