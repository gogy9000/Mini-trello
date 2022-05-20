import React from "react";
import '../App.css';
import {TaskTitleType} from "../Types";
import {ToDo} from "./ToDo";
import {Grid} from "@mui/material";
import {AccordionWrapper} from "../CreateTodo/AccordionForCreateToDoInput/AccordionWrapper";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/ReduxStore";


export const ToDoWrapper = React.memo(() => {

        const tasksTitle = useSelector((state: AppStateType) => state.stateTodo.tasksTitle)

        const todos = tasksTitle.map((todo: TaskTitleType,) => {

                return (
                    <Grid item m={1} p={2} key={todo.id}>
                        <ToDo todo={todo}/>
                    </Grid>
                )
            }
        )

        console.log('render ToDoWRaper')
        return (
            <>
                <AccordionWrapper/>

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
)


