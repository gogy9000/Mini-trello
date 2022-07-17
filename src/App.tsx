import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {CircularProgress, LinearProgress} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";
import {thunks} from "./Redux/ToDoReducer";
import {actionsApp, thunkApp} from "./Redux/AppReducer";
import {TransitionAlerts} from "./TransitionAlerts";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "./features/Login";
import {useDispatchApp, useSelectorApp} from "./custom-hooks/CustomHooks";


export const App = () => {

        const state = useSelectorApp(state => state.toDoReducer)
        const stateApp = useSelectorApp(state => state.appReducer)
        const isAuthorized= useSelectorApp(state=>state.authReducer.isAuthorized)

        const dispatch = useDispatchApp()

        useEffect(() => {
            if(isAuthorized){
            dispatch(thunkApp.initializeApp())
            }

        }, [isAuthorized])

        useEffect(() => {
            if (isAuthorized&&!state.offlineMode) {
                dispatch(thunks.synchronizeTodoAll())
            }
        }, [state.offlineMode,isAuthorized])

        const clearErrorCallback = useCallback(() => {
            dispatch(actionsApp.changeHandleNetworkError(''))
            dispatch(actionsApp.changeHandleClientsError([]))
        }, [dispatch])

        if (stateApp.isInitialization){return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>}
        return (

                    <>
                        <PrimarySearchAppBar/>
                        {stateApp.isWaitingApp && <LinearProgress/>}
                        <TodoContainer/>
                        {/*<Routes>*/}
                        {/*    <Route path='/' element={<TodoContainer/>}/>*/}
                        {/*    <Route path='/incubator-to-do-list' element={<TodoContainer/>}/>*/}
                        {/*    <Route path='/login' element={<Login/>}/>*/}
                        {/*    <Route path='/404' element={<h1>404:PAGE NOT FOUND</h1>}/>*/}
                        {/*    <Route path='*' element={<Navigate to='/404'/>}/>*/}
                        {/*</Routes>*/}
                        <TransitionAlerts error={stateApp.networkError} clearErrorCallback={clearErrorCallback}/>
                        <TransitionAlerts error={stateApp.clientsError[0]} clearErrorCallback={clearErrorCallback}/>

                    </>

        )
            ;
    }





