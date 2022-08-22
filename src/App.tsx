import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {CircularProgress, LinearProgress} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {thunks} from "./Redux/Todo/ToDoReducer";
import {AppDispatchType, AppRootStateType} from "./Redux/ReduxStore";
import {actionsApp,thunkApp} from "./Redux/Application/AppReducer";
import {TransitionAlerts} from "./TransitionAlerts";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "./features/Login";



export const useDispatchApp: () => AppDispatchType = useDispatch
export const useSelectorApp: TypedUseSelectorHook<AppRootStateType> = useSelector

export const App = React.memo(() => {

        const state = useSelectorApp(state => state.toDoReducer)
        const isInitialization=useSelectorApp(state=>state.appReducer.isInitialization)
        const isFetchingAuth=useSelectorApp(state=>state.authReducer.isFetching)
        const networkError=useSelectorApp(state=>state.appReducer.networkError)
        const clientsError=useSelectorApp(state=>state.appReducer.clientsError)
        const isAuthorized = useSelectorApp(state => state.authReducer.isAuthorized)

        const dispatch = useDispatchApp()

        useEffect(() => {
            if (isAuthorized) {
                dispatch(thunkApp.initializeApp())
            }

        }, [isAuthorized])

        useEffect(() => {
            if (isAuthorized && !state.offlineMode) {
                dispatch(thunks.synchronizeTodoAll())
            }
        }, [state.offlineMode, isAuthorized])

        const clearErrorCallback = useCallback(() => {

            dispatch(actionsApp.changeHandleNetworkError(''))
            dispatch(actionsApp.changeHandleClientsError([]))
        }, [dispatch])

        if (isInitialization||isFetchingAuth) {
            return <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        }
        return (

            <>
                <PrimarySearchAppBar/>

                {/*{stateApp.isWaitingApp && <LinearProgress/>}*/}

                <Routes>
                    <Route path='/' element={<TodoContainer/>}/>
                    <Route path='/incubator-to-do-list' element={<TodoContainer/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404:PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                </Routes>

                <TransitionAlerts error={networkError} clearErrorCallback={clearErrorCallback}/>
                <TransitionAlerts error={clientsError[0]} clearErrorCallback={clearErrorCallback}/>

            </>

        )
            ;
    }
)




