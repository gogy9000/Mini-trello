import React, {useCallback, useState} from "react";
import '../../App.css';
import {actions, ActionsType, addTaskTC} from '../../Redux/ToDoReducer';
import {IconButton, Stack, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

type InputBlockForAddTaskPropsType = {
    todoId: string
}

export const InputForAddTask: React.FC<InputBlockForAddTaskPropsType> = React.memo(({todoId}) => {

        const [inputText, setInputText] = useState<string>('')
        const [errorInput, setErrorInput] = useState<boolean>(false)
        const dispatch:Dispatch<ActionsType> = useDispatch()

        const addTask = useCallback( () => {
            if ((/^\s+$/).test(inputText) || inputText === '') {
                setErrorInput(true)
                return
            }
            // @ts-ignore
            dispatch(addTaskTC(todoId, inputText))
            setInputText('')
        },[dispatch,todoId,inputText])

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
            </Stack>
        )
    }
)