import {actionsApp} from "../Redux/AppReducer";
import {AppDispatchType} from "../Redux/ReduxStore";
import {AxiosError} from "axios";

export const handleClientsError = (dispatch: AppDispatchType, error: string[]) => {
    dispatch(actionsApp.changeHandleClientsError(error))
}

export const handlerNetworkError = (dispatch: AppDispatchType, error: unknown) => {
    if (error instanceof AxiosError) {
        dispatch(actionsApp.changeHandleNetworkError(error.message))
    } else {
        throw error
    }
}