import React from "react";
import '../App.css';
import {TodoTitleType} from "../Types";
import {ToDo} from "./ToDo";
import {Grid, Paper} from "@mui/material";
import {AccordionWrapper} from "../CreateTodo/AccordionForCreateToDoInput/AccordionWrapper";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../Redux/ReduxStore";
import {Masonry} from "@mui/lab";


export const TodoContainer = React.memo(() => {

        const tasksTitle = useSelector((state: AppRootStateType) => state.ToDoReducer.tasksTitle)

        const todos = tasksTitle.map((todo: TodoTitleType) => {
                return (
                    <Paper elevation={8} key={todo.id}>
                        <ToDo todo={todo}/>
                    </Paper>

                )
            }
        )

        return (
            <>
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
            </>
        )


    }
)


