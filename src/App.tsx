import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {Alert, Box, Button, Collapse, Grid, IconButton, Snackbar, Stack} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";
import {useDispatch, useSelector} from "react-redux";
import {thunks} from "./Redux/ToDoReducer";
import {AppDispatchType, AppStateType, AppThunk,} from "./Redux/ReduxStore";
import {Dispatch} from "redux";
import {Close} from "@mui/icons-material";
import {actionsApp} from "./Redux/AppReducer";

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
type TransitionAlertsType = {
    clearErrorCallback: () => void
    error: string
}
export const TransitionAlerts: React.FC<TransitionAlertsType> = React.memo(({clearErrorCallback, error}) => {
        const [open, setOpen] = React.useState(false);

        useEffect(() => {
            if (error) {
                setOpen(true)
                setTimeout(() => {
                    setOpen(false)
                    clearErrorCallback()
                }, 10000)
            }
        }, [error])


        const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
                return
            }
            setOpen(false)
            clearErrorCallback()
        };
        return (
            <Snackbar open={open} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        )
    }
)




