import {TodoTitleType} from "../Types";
import React, {useState} from "react";
import {InputForAddTask} from "./InputAddTask/InputForAddTask";
import {ButtonsInToDoContainer} from "../ButtonsAllActiveCommplitedTask/ButtonsInToDoContainer";
import {TasksContainer} from "./Tasks/TasksContainer";
import {TodoTitle} from "./TitleTodo/TodoTitle";
import {Box, Card, Divider, Grid, Paper, Typography} from "@mui/material";

type ToDoPropsType = {
    todo: TodoTitleType
}

export const ToDo: React.FC<ToDoPropsType> = React.memo(({todo}) => {
    const [filter, setFilter]=useState('all')

        return (

                <Card variant='outlined'
                      sx={{display: 'flex',
                          padding:1,
                          flexDirection: 'column',
                          justifyContent:'stretch',
                          rowGap:1,
                          alignItems:'stretch'}}>

                    <TodoTitle todo={todo}/>

                    <InputForAddTask todoId={todo.id}/>

                    <TasksContainer todoId={todo.id} filter={filter}/>

                    <ButtonsInToDoContainer todoId={todo.id} filter={filter}/>

                </Card>



        )
    }
)


