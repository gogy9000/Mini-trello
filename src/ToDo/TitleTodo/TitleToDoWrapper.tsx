import {TaskTitleType} from "../../Types";
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {IconButton, Stack, TextField} from "@mui/material";
import {Delete, Edit, ModeEdit} from "@mui/icons-material";
import {actions, ActionsType} from '../../Redux/ToDoReducer';
import {useDispatch} from "react-redux";

type TaskTitleBlockPropsType = {
    task: TaskTitleType
    setError: Dispatch<SetStateAction<string>>
    error: string
    // dispatch: (action: ActionsType) => void
}
const TitleToDo: React.FC<TaskTitleBlockPropsType> = ({

                                                          task,
                                                          setError,
                                                          error,
                                                      }) => {
    const dispatch = useDispatch()
    const [todoName, setTodoName] = useState<string>('')
    const [updateTodoMode, setUpdateTodoMode] = useState<boolean>(false)

    const setTodoNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoName(e.currentTarget.value)
    }

    const updateTodoName = () => {
        if (!todoName.trim()) {
            setError('Title must not be empty')
            return
        }
        dispatch(actions.updateTodoNameAC(todoName ? todoName.trim() : 'unnamed todo', task.id))
        setUpdateTodoMode(!updateTodoMode)
    }

    const onUpdateTodoMode = () => setUpdateTodoMode(true)


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
                            onChange={setTodoNameOnChange}
                            value={todoName}
                            error={!!error}
                            id="filled-error-helper-text"
                            label={'New todo name'}
                            helperText={!!error ? error : false}
                            variant="filled"
                        />
                        <IconButton onClick={updateTodoName} size={'small'}><Edit color={"primary"}/></IconButton>
                    </Stack>

            }
        </>
    )

}
export const TitleToDoWrapper = React.memo(TitleToDo)