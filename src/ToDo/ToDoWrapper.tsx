import React, {useReducer, useState} from "react";
import '../App.css';
import {taskTitle} from "../Types";
import {ToDo} from "./ToDo";
import { initialState, ToDoReducer} from "../ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {Grid} from "@mui/material";
import {AccordionWrapper} from "../CreateTodo/AccordionForCreateToDoInput/AccordionWrapper";


const ToDoWrapperMemo = () => {



    const [state, dispatch] = useReducer(ToDoReducer, initialState)


    const todos = state.tasksTitle.map((task: taskTitle,) => {

            return (
                <Grid item m={1} p={2} key={task.id}>
                    <ToDo
                          task={task}
                          activeTasks={state.taskBody[task.id].activeTasks}
                          completedTasks={state.taskBody[task.id].completedTasks}
                          dispatch={dispatch}/>
                </Grid>
            )
        }
    )

    console.log('render ToDoWRaper')
    return (
        <>
            <AccordionWrapper dispatch={dispatch}
                              />


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
export const ToDoWrapper=React.memo(ToDoWrapperMemo)


