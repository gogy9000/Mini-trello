import {combineReducers, legacy_createStore} from "redux";
import {ToDoReducer} from './ToDoReducer';
import {loadState, saveState} from "../local-storage-utils/Local-storage-utils";


type RootReducerType = typeof rootReducer
export type AppStateType=ReturnType<RootReducerType>

const persistState=loadState()



let rootReducer= combineReducers({
    stateTodo:ToDoReducer
})

export let store= legacy_createStore(rootReducer, persistState )

store.subscribe(()=>{
    saveState(store.getState())
})

// @ts-ignore
window.store=store
