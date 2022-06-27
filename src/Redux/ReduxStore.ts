import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {actions, toDoReducer} from './ToDoReducer';
import {loadState, saveState} from "../local-storage-utils/Local-storage-utils";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {actionsApp, appReducer} from "./AppReducer";

export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type UnionActionsType = InferActionsType<typeof actions | typeof actionsApp>
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnionActionsType>
export type AppThunk<ReturnType=void>=ThunkAction<ReturnType,AppRootStateType,unknown,UnionActionsType>

const persistState = loadState()

const composeEnhancers = composeWithDevTools({
    trace:true,
    traceLimit:10
});


let rootReducer = combineReducers({
    toDoReducer: toDoReducer,
    appReducer
})


export let store = legacy_createStore(rootReducer, persistState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
    saveState(store.getState())
})

// @ts-ignore
window.store = store
