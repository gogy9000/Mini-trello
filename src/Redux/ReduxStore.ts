import {combineReducers, legacy_createStore} from "redux";
import {ToDoReducer} from './ToDoReducer';

type RootReducerType = typeof rootReducer
export type AppStateType=ReturnType<RootReducerType>

let rootReducer= combineReducers({
    stateTodo:ToDoReducer
})

export let store= legacy_createStore(rootReducer)
