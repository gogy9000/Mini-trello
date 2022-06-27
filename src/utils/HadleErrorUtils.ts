
import {actionsApp} from "../Redux/AppReducer";
import {AppDispatchType} from "../Redux/ReduxStore";

export const handleClientsError=(dispatch:AppDispatchType, error:string[])=>{
    dispatch(actionsApp.changeHandleClientsError(error))
}