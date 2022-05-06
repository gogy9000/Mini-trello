import React, {useState} from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {taskTitle} from "./Types";
import {ToDo} from "./ToDo";
import {createNewTodoAC} from "./Redux/ToDoReducer";
import {CustomEditSpan} from "./CustomEditSpan";
import {CustomButton} from "./CustomButton";
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";


export const ToDos = () => {

    let state = useSelector((state: any) => state.stateTaskBlock)
    const dispatch = useDispatch()
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
                <Grid item m={1} p={2}>
                    <ToDo lastItem={arr.length - index}
                          createMode={createMode}
                          key={task.id}
                          task={task}
                          state={state}/>
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


