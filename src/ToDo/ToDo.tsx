import {TodoTitleType} from "../Types";
import React from "react";
import {InputForAddTask} from "./InputAddTask/InputForAddTask";
import {ButtonsInToDoContainer} from "../ButtonsAllActiveCommplitedTask/ButtonsInToDoContainer";
import {TasksContainer} from "./Tasks/TasksContainer";
import {TodoTitle} from "./TitleTodo/TodoTitle";
import {Card} from "@mui/material";


type ToDoPropsType = {
    todo: TodoTitleType
}

export const ToDo: React.FC<ToDoPropsType> = React.memo(({todo}) => {

        return (

                <Card variant='outlined'
                      sx={{display: 'flex',
                          padding:1,
                          flexDirection: 'column',
                          justifyContent:'stretch',
                          rowGap:1,
                          alignItems:'stretch'}}>

                    <TodoTitle todo={todo}/>

                    <InputForAddTask todo={todo}/>

                    <TasksContainer todoId={todo.id} filter={todo.filter}/>

                    <ButtonsInToDoContainer todoId={todo.id} filter={todo.filter}/>

                </Card>



        )
    }
)


