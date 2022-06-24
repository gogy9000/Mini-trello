import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {Grid, LinearProgress} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";
import {useDispatch, useSelector} from "react-redux";
import {thunks} from "./Redux/ToDoReducer";
import {AppStateType,} from "./Redux/ReduxStore";
import {actionsApp} from "./Redux/AppReducer";
import {TransitionAlerts} from "./TransitionAlerts";

export const useAppDispatch = () => useDispatch()

export const App = React.memo(() => {
        const state = useSelector((state: AppStateType) => state.ToDoReducer)
        const stateApp = useSelector((state: AppStateType) => state.appReducer)

        const dispatch = useDispatch()

        useEffect(() => {
            // @ts-ignore
            dispatch(thunks.getTodolistAndTasks())
        }, [])
        useEffect(() => {

            if (!state.offlineMode) {
                // @ts-ignore
                dispatch(thunks.synchronizeTodo())
            }
        }, [state.offlineMode])

    const clearErrorCallback = useCallback( () => {
        dispatch(actionsApp.changeHandleNetworkError(''))
        dispatch(actionsApp.changeHandleClientsError([]))

    },[stateApp])


        return (

            <>
                <PrimarySearchAppBar/>
                {stateApp.isWaitingApp&&<LinearProgress/>}
                <Grid container direction='column' justifyContent='end' spacing={1} pl={3} pr={3}>
                    <TodoContainer/>
                </Grid>
                <TransitionAlerts error={stateApp.networkError} clearErrorCallback={clearErrorCallback}/>
                <TransitionAlerts error={stateApp.clientsError[0]} clearErrorCallback={clearErrorCallback}/>

            </>
        )
            ;
    }
)




