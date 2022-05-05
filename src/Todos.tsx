import React, {useState} from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {taskTitle} from "./Types";
import {ToDo} from "./ToDo";
import {createNewTodoAC} from "./Redux/ToDoReducer";
import {CustomEditSpan} from "./CustomEditSpan";
import {CustomButton} from "./CustomButton";
import {Button, Grid, TextField, Typography} from "@mui/material";


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

                 <ToDo lastItem={arr.length - index}
                       createMode={createMode}
                       key={task.id}
                       task={task}
                       state={state}/>

            )
        }
    )


    return (
        <>

            <Grid container mt={2} spacing={2} direction={'column'}>
                <Typography>
                    <TextField id="outlined-basic" label="Create new todo" variant="standard"
                               value={todoName}
                               onBlur={() => {
                                   setTodoName('')
                               }}
                               onChange={(e) => {
                                   setTodoName(e.currentTarget.value)
                               }}/>

                    <Button variant="outlined" onMouseUp={moveCreateTask}
                            onMouseDown={createTask}
                    >Create</Button>
                </Typography>
            </Grid>

            <Grid container m={4} direction={'column'} columns={3}>
                <Grid item>
                    <Typography>
                        <span>{todos}</span>
                    </Typography>
                </Grid>
            </Grid>

        </>
    )
}


