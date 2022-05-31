import React from "react";
import '../App.css';
import {TodoTitleType} from "../Types";
import {ToDo} from "./ToDo";
import {Grid} from "@mui/material";
import {AccordionWrapper} from "../CreateTodo/AccordionForCreateToDoInput/AccordionWrapper";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/ReduxStore";
import {Masonry} from "@mui/lab";


export const TodoContainer = React.memo(() => {

        const tasksTitle = useSelector((state: AppStateType) => state.stateTodo.tasksTitle)

        const todos = tasksTitle.map((todo: TodoTitleType) => {
                return (
                    <Grid key={todo.id} item>
                        <ToDo todo={todo}/>
                    </Grid>

                )
            }
        )

        return (
            <>
                <AccordionWrapper/>

                <Grid container
                      spacing={1}
                      flexWrap={'wrap'}
                      columns={{xs: 1, sm: 2, md: 3}}>
                    {todos}
                </Grid>
            </>
        )


    }
)


