import {actionsApp} from "../Redux/Application/AppReducer";
import {AppDispatchType} from "../Redux/ReduxStore";
import {AxiosError, AxiosResponse} from "axios";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";
import {Data} from "../DAL/TodoAPI";

export const handleClientsError = (dispatch: ThunkDispatch<unknown, unknown, AnyAction>, error: string[]) => {
    dispatch(actionsApp.changeHandleClientsError(error))
}

export const handlerNetworkError = (dispatch:ThunkDispatch<unknown, unknown, AnyAction>, error: unknown) => {
    if (error instanceof AxiosError) {
        dispatch(actionsApp.changeHandleNetworkError(error.message))
        return error.message
    } else {
        throw error
    }
}

export const errorsInterceptor=
    (dispatch:ThunkDispatch<unknown, unknown, AnyAction>,promises:Promise<AxiosResponse<Data>>[])=> {
        console.log(promises)
    Promise.all(promises).then(value => {
        value.forEach(promise=>{
            debugger
            handleClientsError(dispatch, promise.data.messages)
        })
    }).catch((e) => {
        console.log(e)
        handlerNetworkError(dispatch, e)
    })
}