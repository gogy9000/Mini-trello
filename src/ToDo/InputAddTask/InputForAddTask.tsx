import React, {useCallback, useState} from "react";
import '../../App.css';
import {thunks} from '../../Redux/Todo/ToDoReducer';
import {Stack, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";
import {useDispatchApp, useSelectorApp} from "../../App";
import {TodoListItem} from "../../DAL/TodoAPI";
import {FabWithCircularProgress} from "../../common/FabWithCircularProgress";

type InputBlockForAddTaskPropsType = {
    todo: TodoListItem
}

export const InputForAddTask: React.FC<InputBlockForAddTaskPropsType> = React.memo(({todo}) => {

        const [inputText, setInputText] = useState<string>('')
        const [errorInput, setErrorInput] = useState<boolean>(false)

        const dispatch = useDispatchApp()
        const isWaitingTodo = useSelectorApp(store => store.toDoReducer.waitingList[todo._id])

        const addTask = useCallback(() => {

            if ((/^\s+$/).test(inputText) || inputText === '') {
                setErrorInput(true)
                return
            }

            dispatch(thunks.addTask({todo, taskTitle:inputText}))
            setInputText('')
        }, [dispatch, todo._id, inputText])

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
                    fullWidth
                    variant="filled"
                />
                <FabWithCircularProgress callback={addTask} isProgress={isWaitingTodo}
                                         color={!todo.isASynchronizedTodo ? 'secondary' : "default"}>
                    <AddTask/>
                </FabWithCircularProgress>
            </Stack>
        )
    }
)

