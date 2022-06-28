import {TodoTitleType} from "../../Types";
import React, {ChangeEvent, useCallback, useState} from "react";
import {Box, Card, IconButton, LinearProgress, Stack, TextField, Typography} from "@mui/material";
import {CloudUpload, Delete, Edit, ModeEdit} from "@mui/icons-material";
import {thunks} from '../../Redux/ToDoReducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/ReduxStore";
import {useDispatchApp, useSelectorApp} from "../../App";

type TodoTitlePropsType = {
    todo: TodoTitleType
}
export const TodoTitle: React.FC<TodoTitlePropsType> = React.memo(({todo}) => {

        const [todoName, setTodoName] = useState<string>(todo.title)
        const [updateTodoMode, setUpdateTodoMode] = useState<boolean>(false)
        const [error, setError] = useState<string>('')

        const isWaitingTodo=useSelectorApp(store=>store.appReducer.waitingList[todo.id])
        const dispatch = useDispatchApp()

        const setTodoNameOnChange = (e: ChangeEvent<HTMLInputElement>) => setTodoName(e.currentTarget.value)

        const updateTodoName = useCallback(() => {
            if (!todoName.trim()) {
                setError('Title must not be empty')
                return
            }
            dispatch(thunks.updateTodoList(todo.id, todoName.trim()))
            setUpdateTodoMode(!updateTodoMode)
        }, [dispatch, todo, todoName,updateTodoMode])

        const onUpdateTodoMode = () => setUpdateTodoMode(true)


        const removeTodo = useCallback(() => {
            dispatch(thunks.deleteTodolist(todo.id))
        }, [dispatch, todo.id])

    const uploadTodo = () => {
        dispatch(thunks.synchronizeTodo(todo))
    }

        return (
            <>
                {
                    !updateTodoMode
                        ?
                        <Card variant={'outlined'} sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flexEnd'
                            }}>
                                <Typography variant={'h6'} p={1}>
                                    {todo.title}

                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-end'
                                }}>
                                    <IconButton onClick={removeTodo}><Delete/></IconButton>
                                    <IconButton onClick={onUpdateTodoMode}><ModeEdit/></IconButton>
                                    <IconButton onClick={uploadTodo}>
                                        <CloudUpload color={todo.isASynchronizedTodo?'inherit':'success'}/>
                                    </IconButton>

                                </Box>
                            </Box>
                        </Card>
                        :
                        <Stack direction='row'>
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
                {isWaitingTodo&&<LinearProgress/>}
            </>
        )
    }
)
