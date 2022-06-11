import React, {useEffect} from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {Button, Container, Grid} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";
import {useDispatch} from "react-redux";
import { thunks} from "./Redux/ToDoReducer";
import {AppDispatchType} from "./Redux/ReduxStore";

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const App = React.memo(function App() {

        const dispatch = useAppDispatch()




        const load = () => {
            // @ts-ignore
            dispatch(thunks.getTodolistTC())
        }

        return (

            <>

                <PrimarySearchAppBar/>
                <Button onClick={load}>load</Button>
                <Grid container direction='column' justifyContent='end' spacing={1} pl={3} pr={3}>
                    <TodoContainer/>
                </Grid>
            </>
        )
            ;
    }
)




