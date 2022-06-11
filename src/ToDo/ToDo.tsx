import {TodoTitleType} from "../Types";
import React, {useEffect, useState} from "react";
import {InputForAddTask} from "./InputAddTask/InputForAddTask";
import {ButtonsInToDoContainer} from "../ButtonsAllActiveCommplitedTask/ButtonsInToDoContainer";
import {TasksContainer} from "./Tasks/TasksContainer";
import {TodoTitle} from "./TitleTodo/TodoTitle";
import {Box, Card, Divider, Grid, Paper, Typography} from "@mui/material";
import {APITodo} from "../DAL/TodoAPI";

type ToDoPropsType = {
    todo: TodoTitleType
}

export const ToDo: React.FC<ToDoPropsType> = React.memo(({todo}) => {
    // console.log(todo)
    // useEffect(()=>{
    //     APITodo.updateTask(todo.title)
    // },[])
        //addedDate: "2022-06-09T13:13:44.687"
    // filter: "All"
    // id: "17f341ab-fb90-4021-b11f-b58425cbe71d"
    // order: 0
    // title: "s"
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

                    <TasksContainer todoId={todo.id} filter={todo.filter}/>

                    <ButtonsInToDoContainer todoId={todo.id} filter={todo.filter}/>

                </Card>



        )
    }
)


