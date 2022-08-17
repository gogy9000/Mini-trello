
import {actions, toDoReducer} from './Todo/ToDoReducer';
import {loadState, saveState} from "../local-storage-utils/Local-storage-utils";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {actionsApp, appReducer} from "./Application/AppReducer";
import {actionsAuth, authReducer} from "./auth/Auth";
import {configureStore,combineReducers} from "@reduxjs/toolkit";



export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type UnionActionsType = InferActionsType<typeof actions | typeof actionsApp>
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnionActionsType>
export type AppThunk<ReturnType=any> = ThunkAction<ReturnType, AppRootStateType, unknown, UnionActionsType>

const preloadedState :AppRootStateType = loadState()




let rootReducer = combineReducers({
    toDoReducer,
    appReducer,
    authReducer
})



export let store = configureStore({
        reducer:rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState,

}
)

store.subscribe(() => {
    saveState(store.getState())
})

// @ts-ignore
window.store = store
