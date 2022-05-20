import React, {useState} from "react";
import '../../App.css';
import {actions} from '../../Redux/ToDoReducer';
import {IconButton, Stack, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";
import {useDispatch} from "react-redux";

type InputBlockForAddTaskPropsType = {
    todoId: string
}

export const InputBlockForAddTask: React.FC<InputBlockForAddTaskPropsType> = React.memo(({idTitle}) => {

        const [inputText, setInputText] = useState<string>('')
        const [errorInput, setErrorInput] = useState<boolean>(false)
        const dispatch = useDispatch()

        const addTask = () => {
            if ((/^\s+$/).test(inputText) || inputText === '') {
                setErrorInput(true)
                return
            }
            dispatch(actions.addTaskAC(idTitle, inputText))
            setInputText('')
        }

        const ChangeTextTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)


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
                    variant="filled"
                />
                <IconButton onClick={addTask}><AddTask/></IconButton>
            </Stack>
        )
    }
)