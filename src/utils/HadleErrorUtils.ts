import {Dispatch} from "redux";
import {actionsApp} from "../Redux/AppReducer";
import {ActionsType} from "../Redux/ToDoReducer";

export const handleClientsError=(dispatch:(action: ActionsType) => void, error:string[])=>{
    dispatch(actionsApp.changeHandleClientsError(error))
}