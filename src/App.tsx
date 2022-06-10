import React, {useEffect} from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {Button, Container, Grid} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";
import {useDispatch} from "react-redux";
import {ActionsType, getTodolistTC} from "./Redux/ToDoReducer";
import {Dispatch} from "redux";
import {AppDispatchType} from "./Redux/ReduxStore";

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const App = React.memo(function App() {

        const dispatch = useAppDispatch()


        // useEffect(() => { // @ts-ignore
        //     dispatch(getTodolistTC())
        // }, [])

        const load = () => {
            // @ts-ignore
            dispatch(getTodolistTC())
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




