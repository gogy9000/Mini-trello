import React, {useReducer, useState} from "react";
import './App.css';
import {taskTitle} from "./Types";
import {ToDo} from "./ToDo";
import {
    createNewTodoAC,
    initialState,
    ToDoReducer
} from "./ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {Button, Grid, Paper, TextField} from "@mui/material";


export const ToDos = () => {
    const [state,dispatch]=useReducer(ToDoReducer,initialState)

    let [todoName, setTodoName] = useState<string>('')
    const [createMode, setCreateMode] = useState<boolean>(false)

    const createTask = () => {
        if (!todoName && createMode) {
            return
        }
        dispatch(createNewTodoAC(todoName ? todoName : 'no name task'))
        setTodoName('')
        setCreateMode(false)
    }

    const moveCreateTask = () => {
        setTodoName('')
        setCreateMode(true)
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
            <Paper elevation={12}>
                <Grid container
                      m={2}
                      p={2}
                      columnSpacing={2}
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item>
                        <TextField id="outlined-basic" label="Create new todo" variant="standard"
                                   value={todoName}
                                   onBlur={() => {
                                       setTodoName('')
                                   }}
                                   onChange={(e) => {
                                       setTodoName(e.currentTarget.value)
                                   }}/>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onMouseUp={moveCreateTask}
                                onMouseDown={createTask}
                        >Create</Button>
                    </Grid>
                </Grid>
            </Paper>


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


