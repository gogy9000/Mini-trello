import React, {useEffect} from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {Button, Container, Grid} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";
import {useDispatch, useSelector} from "react-redux";
import { thunks} from "./Redux/ToDoReducer";
import {AppDispatchType, AppStateType} from "./Redux/ReduxStore";

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const App = React.memo( () =>{
    console.log('!!')
        const dispatch = useAppDispatch()
        const state=useSelector((state:AppStateType)=>state)
        useEffect(()=>{
            // @ts-ignore
            dispatch(thunks.getTodolistAndTasks())
        },[])

        //
        // const load = () => {
        //     // @ts-ignore
        //     dispatch(thunks.getTodolistAndTasks())
        // }

        return (

            <>

                <PrimarySearchAppBar/>
                {/*<Button onClick={load}>load</Button>*/}
                <Grid container direction='column' justifyContent='end' spacing={1} pl={3} pr={3}>
                    <TodoContainer/>
                </Grid>
            </>
        )
            ;
    }
)




