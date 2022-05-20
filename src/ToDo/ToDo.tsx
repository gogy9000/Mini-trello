import {TodoTitleType} from "../Types";
import React, {useState} from "react";
import {InputBlockForAddTask} from "./InputAddTask/InputBlockForAddTask";
import {ButtonsInToDoWrapper} from "../ButtonsAllActiveCommplitedTask/ButtonsInToDoWrapper";
import {TasksWrapper} from "./Tasks/TasksWrapper";
import {TitleToDoWrapper} from "./TitleTodo/TitleToDoWrapper";
import {Divider, Grid, Paper, Typography} from "@mui/material";

type ToDoPropsType = {
    todo: TodoTitleType
}
export const ToDo: React.FC<ToDoPropsType> = React.memo(({todo}) => {



        console.log('render ToDo')
        return (

            <Paper elevation={24}>
                <Grid container
                      p={2}
                      direction={"column"}
                      justifyContent="center"
                      alignItems="center">

                    <Grid item container justifyContent="right" alignItems='flex-end' p={3}>
                        <Typography variant={"h5"} component={'div'}>
                            <TitleToDoWrapper
                                todo={todo}
                            />
                            <Divider/>
                        </Typography>
                    </Grid>

                    <Grid item container direction={'column'} rowSpacing={2} justifyContent={'center'}>

                        <Grid item>
                            <InputBlockForAddTask
                                idTitle={todo.id}
                            />
                        </Grid>

                        <Grid container item justifyContent='center'>
                            <Typography component={'div'}>
                                <TasksWrapper
                                    todoId={todo.id}
                                    filter={todo.filter}
                                />
                            </Typography>
                        </Grid>

                        <Grid container item justifyContent="center" alignItems="flex-end" m={1}>
                            <Paper elevation={6}>
                                <ButtonsInToDoWrapper todoId={todo.id} filter={todo.filter}/>
                            </Paper>
                        </Grid>

                    </Grid>


                </Grid>
            </Paper>

        )
    }
)


