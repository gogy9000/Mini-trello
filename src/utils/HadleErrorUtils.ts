import {actionsApp} from "../Redux/Application/AppReducer";
import {AppDispatchType} from "../Redux/ReduxStore";
import {AxiosError} from "axios";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";

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