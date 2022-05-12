import {taskTitle} from "../../Types";
import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {IconButton, Stack, TextField} from "@mui/material";
import {Delete, Edit, ModeEdit} from "@mui/icons-material";
import {actions, ActionsType} from "../../ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";

type TaskTitleBlockPropsType = {
    updateTodoMode: boolean
    onUpdateTodoMode: () => void
    task: taskTitle
    setError: Dispatch<SetStateAction<string>>
    todoNameChanger: (e: ChangeEvent<HTMLInputElement>) => void
    todoName: string
    error: string
    updateTodoName: () => void
    dispatch: (action: ActionsType) => void
}
export const TitleToDoWrapper: React.FC<TaskTitleBlockPropsType> = ({
                                                                      dispatch,
                                                                      updateTodoMode,
                                                                      onUpdateTodoMode,
                                                                      task,
                                                                      setError,
                                                                      todoNameChanger,
                                                                      todoName,
                                                                      error,
                                                                      updateTodoName
                                                                  }) => {

    const removeTodo = () => {
        dispatch(actions.removeTodoAC(task.id))
    }
    return (
        <>
            {
                !updateTodoMode
                    ?
                    <Stack direction='row' spacing={1}>
                        <div>{task.titleName}</div>
                        <IconButton onClick={onUpdateTodoMode}><ModeEdit/></IconButton>
                        <IconButton onClick={removeTodo}><Delete/></IconButton>
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
                            helperText={!!error?error:false}
                            variant="filled"
                        />
                        <IconButton onClick={updateTodoName} size={'small'}><Edit color={"primary"}/></IconButton>
                    </Stack>

            }
        </>
    )

}