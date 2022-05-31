import {TodoTitleType} from "../Types";
import React from "react";
import {InputForAddTask} from "./InputAddTask/InputForAddTask";
import {ButtonsInToDoContainer} from "../ButtonsAllActiveCommplitedTask/ButtonsInToDoContainer";
import {TasksContainer} from "./Tasks/TasksContainer";
import {TodoTitle} from "./TitleTodo/TodoTitle";
import {Divider, Grid, Paper, Typography} from "@mui/material";

type ToDoPropsType = {
    todo: TodoTitleType
}

export const ToDo: React.FC<ToDoPropsType> = React.memo(({todo}) => {

        return (
            <Paper elevation={24}>
                <Grid container
                      p={2}
                      direction={"column"}
                      justifyContent="center"
                      wrap={"wrap"}
                      alignItems="center">

                    <Grid item container justifyContent="right" alignItems='flex-end' p={3}>
                        <Typography variant={"h5"} component={'div'}>
                            <TodoTitle todo={todo}/>
                            <Divider variant={'fullWidth'}/>
                        </Typography>
                    </Grid>

                    <Grid item container direction={'column'} rowSpacing={2} justifyContent={'center'}>

                        <Grid item>
                            <InputForAddTask todoId={todo.id}/>
                        </Grid>

                        <Grid container item justifyContent='center'>
                            <Typography component={'div'}>
                                <TasksContainer todoId={todo.id} filter={todo.filter}/>
                            </Typography>
                        </Grid>

                        <Grid container item justifyContent="center" alignItems="flex-end" >
                                <ButtonsInToDoContainer todoId={todo.id} filter={todo.filter}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        )
    }
)


