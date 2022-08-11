import {appSlice} from "../Redux/AppReducer";
import {AppDispatchType} from "../Redux/ReduxStore";
import {AxiosError} from "axios";

export const handleClientsError = (dispatch: AppDispatchType, error: string[]) => {
    dispatch(appSlice.actions.changeHandleClientsError(error))
}

export const handlerNetworkError = (dispatch: AppDispatchType, error: unknown) => {
    if (error instanceof AxiosError) {
        dispatch(appSlice.actions.changeHandleNetworkError(error.message))
        return error.message
    } else {
        throw error
    }
}