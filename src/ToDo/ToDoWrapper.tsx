import React, {useReducer, useState} from "react";
import '../App.css';
import {taskTitle} from "../Types";
import {ToDo} from "./ToDo";
import {createNewTodoAC, initialState, ToDoReducer} from "../ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {Grid} from "@mui/material";
import {CreateToDoInputWrapper} from "../CreateTodo/CreateToDoInputWrapper";
import {AccordionWrapper} from "../App";


export const ToDoWrapper = () => {
    const [state, dispatch] = useReducer(ToDoReducer, initialState)

    let [todoName, setTodoName] = useState<string>('')
    const [createMode, setCreateMode] = useState<boolean>(false)
    let [error, setError] = useState<string>('')

    const createTask = () => {

        if (!todoName.trim()||!todoName.trim() && createMode) {
            setError('To do title must not be empty')
            return
        }
        dispatch(createNewTodoAC(todoName.trim()))
        setTodoName('')
        setCreateMode(false)
        setError('')
    }

    const moveCreateTask = () => {
        setTodoName('')
        setCreateMode(true)
    }
    const setToDoTitle = (newToDoTitle: string) => {
        setError('')
        setTodoName(newToDoTitle)
    }


    const todos = state.tasksTitle.map((task: taskTitle, index: number, arr: Array<taskTitle>) => {
            return (
                <Grid item m={1} p={2} key={task.id}>
                    <ToDo lastItem={arr.length - index}
                          createMode={createMode}
                          key={task.id}
                          task={task}
                          state={state}
                          dispatch={dispatch}/>
                </Grid>
            )
        }
    )


    return (
        <>
            <AccordionWrapper error={error}
                              todoName={todoName}
                              moveCreateTask={moveCreateTask}
                              createTask={createTask} SetToDoTitle={setToDoTitle}/>


            <Grid container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="flex-start"
            >
                {todos}
            </Grid>
        </>
    )


}


