import React, {useCallback, useState} from "react";
import '../../App.css';
import {thunks} from '../../Redux/ToDoReducer';
import {IconButton, LinearProgress, Stack, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";
import {useDispatchApp, useSelectorApp} from "../../App";
import {TodoListItem} from "../../DAL/TodoAPI";

type InputBlockForAddTaskPropsType = {
    todo:TodoListItem
}

export const InputForAddTask: React.FC<InputBlockForAddTaskPropsType> = React.memo(({todo}) => {

        const [inputText, setInputText] = useState<string>('')
        const [errorInput, setErrorInput] = useState<boolean>(false)

        const dispatch = useDispatchApp()
        const isWaitingTodo=useSelectorApp(store=>store.appReducer.waitingList[todo.id])

        const addTask = useCallback( () => {

            if ((/^\s+$/).test(inputText) || inputText === '') {
                setErrorInput(true)
                return
            }

            dispatch(thunks.addTaskTC(todo, inputText))
            setInputText('')
        },[dispatch,todo.id,inputText])

        const ChangeTextTaskTitle =(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)


        const onclickHandler = () => {
            setInputText('')
            setErrorInput(false)
        }

        return (
            <Stack direction='row' justifyContent={'center'}>
                <TextField
                    size={'small'}
                    onChange={ChangeTextTaskTitle}
                    onClick={onclickHandler}
                    value={inputText}
                    error={errorInput}
                    id="filled-error-helper-text"
                    label={errorInput ? "field is empty." : 'New todo'}
                    helperText={errorInput ? "field is empty." : ""}
                    fullWidth
                    variant="filled"
                />
                <IconButton onClick={addTask}><AddTask/></IconButton>
                {isWaitingTodo&&<LinearProgress/>}
            </Stack>
        )
    }
)