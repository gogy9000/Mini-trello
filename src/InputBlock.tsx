import React, {useState} from "react";
import './App.css';
import {InputPropsType} from "./Types";
import {addTaskAC} from "./Redux/ToDoReducer";
import {CustomButton} from "./CustomButton";
import {Button, IconButton, Stack, TextField} from "@mui/material";
import {Simulate} from "react-dom/test-utils";
import {Edit} from "@mui/icons-material";



export const InputBlock = (props: InputPropsType) => {

    const [inputText, setInputText]= useState<string>('')
    const [errorInput, setErrorInput]=useState<boolean>(false)

    const addTask = () => {
        if ((/^\s+$/).test(inputText) || inputText === '') {
            setErrorInput(true)
            return
        }
      props.dispatch(addTaskAC(props.idTitle,inputText))
        setInputText('')
    }

    const ChangeTextTaskTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    }

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
                label={errorInput?"field is empty.":'New task'}
                helperText={errorInput?"field is empty.":""}
                variant="filled"
            />

            <IconButton onClick={addTask}><Edit/></IconButton>
        </Stack>
    )
}