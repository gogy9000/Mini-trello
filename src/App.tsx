import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {Grid, LinearProgress} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {thunks} from "./Redux/ToDoReducer";
import {AppDispatchType, AppRootStateType, AppThunk,} from "./Redux/ReduxStore";
import {actionsApp} from "./Redux/AppReducer";
import {TransitionAlerts} from "./TransitionAlerts";


export const useDispatchApp: ()=>AppDispatchType = useDispatch
export const useSelectorApp: TypedUseSelectorHook<AppRootStateType> = useSelector

export const App = React.memo(() => {

        const state = useSelectorApp(state => state.toDoReducer)
        const stateApp = useSelectorApp(state => state.appReducer)

        const dispatch = useDispatchApp()

        useEffect(() => {

            dispatch(thunks.getTodolistAndTasks())
        }, [])
        useEffect(() => {

            if (!state.offlineMode) {
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




