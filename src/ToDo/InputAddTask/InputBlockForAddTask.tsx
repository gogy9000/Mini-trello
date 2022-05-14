import React, {useState} from "react";
import '../../App.css';
import {InputPropsType, StateType} from "../../Types";
import {actions, ActionsType} from "../../ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {IconButton, Stack, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";

type InputBlockForAddTaskPropsType={
    idTitle:string
    dispatch: (action:ActionsType) => void

}
 const InputBlockForAddTaskMemo:React.FC<InputBlockForAddTaskPropsType> = ({idTitle,dispatch}) => {

    const [inputText, setInputText] = useState<string>('')
    const [errorInput, setErrorInput] = useState<boolean>(false)

    const addTask = () => {
        if ((/^\s+$/).test(inputText) || inputText === '') {
            setErrorInput(true)
            return
        }
        dispatch(actions.addTaskAC(idTitle, inputText))
        setInputText('')
    }

    const ChangeTextTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                label={errorInput ? "field is empty." : 'New task'}
                helperText={errorInput ? "field is empty." : ""}
                variant="filled"
            />

            <IconButton onClick={addTask}><AddTask/></IconButton>
        </Stack>
    )
}
export const InputBlockForAddTask=React.memo(InputBlockForAddTaskMemo)