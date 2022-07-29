
import {actions, toDoReducer} from './ToDoReducer';
import {loadState, saveState} from "../local-storage-utils/Local-storage-utils";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {appReducer, appSlice, thunkApp} from "./AppReducer";
import {actionsAuth, authReducer, thunkAuth} from "./auth/Auth";
import {configureStore,combineReducers} from "@reduxjs/toolkit";



export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type InferThunksType<T> = T extends { [keys: string]: (...args: any[]) =>(dispatch:AppDispatchType,getState:AppRootStateType)=> infer U } ? Promise<U>: never
export type UnionThunkType=InferThunksType<typeof thunkApp>
export type UnionActionsType = InferActionsType<typeof actions | typeof appSlice.actions|typeof actionsAuth>
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnionActionsType>
export type AppThunk<ReturnType=any> = ThunkAction<ReturnType, AppRootStateType, unknown, UnionActionsType>

const preloadedState :AppRootStateType = loadState()

// const composeEnhancers = composeWithDevTools({
//     trace: true,
//     traceLimit: 10
// });


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
