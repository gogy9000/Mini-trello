import {actionsApp} from "../Redux/Application/AppReducer";
import {AppDispatchType} from "../Redux/ReduxStore";
import {AxiosError, AxiosResponse} from "axios";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";
import {Data, GetTaskType} from "../DAL/TodoAPI";

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
    (dispatch:ThunkDispatch<unknown, unknown, AnyAction>,promises:Promise<AxiosResponse>[]|AxiosResponse[])=> {
    Promise.all(promises).then(value => {
        value.forEach(promise=>{

    if (promise.hasOwnProperty("data")&&promise.data.resultCode !== 0) {
        handleClientsError(dispatch, promise.data.messages)
    }
    if (promise.hasOwnProperty("status")&& promise.status!==200){
        handleClientsError(dispatch, [promise.statusText])
    }
        })
    }).catch((e) => {
        handlerNetworkError(dispatch, e)
    })
}