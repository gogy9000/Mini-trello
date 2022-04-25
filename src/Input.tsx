import React, {useState} from "react";
import './App.css';
import {InputPropsType} from "./Types";
import {addTaskAC} from "./Redux/ToDoReducer";


export const Input = (props: InputPropsType) => {

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
            <input onChange={ChangeTextTaskTitle} value={inputText}
            onClick={onclickHandler}/>
            <button onClick={addTask}>add</button>
            {errorInput&&<div >field is empty</div>}
        </div>
    )
}