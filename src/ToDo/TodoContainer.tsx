import React, {useMemo} from "react";
import '../App.css';
import {TodoTitleType} from "../Types";
import {ToDo} from "./ToDo";
import {Grid, Paper} from "@mui/material";
import {AccordionWrapper} from "../CreateTodo/AccordionForCreateToDoInput/AccordionWrapper";
import {Masonry} from "@mui/lab";
import {Navigate} from 'react-router-dom';
import {useSelectorApp} from "../custom-hooks/CustomHooks";

export const TodoContainer = React.memo(() => {

        const isAuthorized = useSelectorApp(state => state.authReducer.isAuthorized)
        const tasksTitle = useSelectorApp(state => state.toDoReducer.tasksTitle)

        const todos = useMemo( ()=> tasksTitle.map((todo: TodoTitleType) => {
                return (
                    <Paper elevation={8} key={todo.id}>
                        <ToDo todo={todo}/>
                    </Paper>

                )
            }
        ),[tasksTitle])

        if(!isAuthorized){return <Navigate to='/login'/>}
        return (
            <Grid container direction='column' justifyContent='end' spacing={1} pl={3} pr={3}>
                <Grid item>
                    <AccordionWrapper/>
                </Grid>
                <Grid item


                >
                    <Masonry columns={{xs: 1, sm: 2, md: 3, xl: 5, xxl: 6}}
                             sx={{pl: 1}}
                             spacing={2}>
                        {todos}
                    </Masonry>
                </Grid>
            </Grid>
        )


    }
)


