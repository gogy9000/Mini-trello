import {TodoTitleType} from "../../Types";
import React, {ChangeEvent, useCallback, useState} from "react";
import {Box, IconButton, Stack, TextField} from "@mui/material";
import {Delete, Edit, ModeEdit} from "@mui/icons-material";
import {actions} from '../../Redux/ToDoReducer';
import {useDispatch} from "react-redux";

type TodoTitlePropsType = {
    todo: TodoTitleType
}
export const TodoTitle: React.FC<TodoTitlePropsType> = React.memo(({todo}) => {

        const [todoName, setTodoName] = useState<string>('')
        const [updateTodoMode, setUpdateTodoMode] = useState<boolean>(false)
        const [error, setError] = useState<string>('')
        const dispatch = useDispatch()

        const setTodoNameOnChange = (e: ChangeEvent<HTMLInputElement>) => setTodoName(e.currentTarget.value)

        const updateTodoName = useCallback( () => {
            if (!todoName.trim()) {
                setError('Title must not be empty')
                return
            }
            dispatch(actions.updateTodoNameAC(todoName.trim(), todo.id))
            setUpdateTodoMode(!updateTodoMode)
        },[dispatch,todo.id,todoName])

        const onUpdateTodoMode = () => setUpdateTodoMode(true)

        const removeTodo = useCallback( () => dispatch(actions.removeTodoAC(todo.id)),[dispatch,todo.id])

        return (
            <>
                {
                    !updateTodoMode
                        ?
                        <Stack direction='row' spacing={1}>
                            <Box sx={{flexWrap:'wrap'}}>{todo.titleName}</Box>
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
)
