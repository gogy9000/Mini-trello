import React, {useState} from "react";
import './App.css';
import {InputPropsType} from "./Types";
import {addTaskAC} from "./Redux/ToDoReducer";
import {CustomButton} from "./CustomButton";
import {Button, TextField} from "@mui/material";
import {Simulate} from "react-dom/test-utils";



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
        <div className={errorInput?'error':'notError'}>
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
            {/*<input onChange={ChangeTextTaskTitle} value={inputText}*/}
            {/*onClick={onclickHandler}/>*/}
            <Button onClick={addTask} variant={'outlined'}>add</Button>
            {/*<CustomButton onClick={addTask}>add</CustomButton>*/}

            {/*{errorInput&&<div >field is empty</div>}*/}
        </div>
    )
}