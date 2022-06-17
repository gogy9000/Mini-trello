import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ActionsType, ToDoReducer} from './ToDoReducer';
import {loadState, saveState} from "../local-storage-utils/Local-storage-utils";
import thunk, {ThunkAction} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {StateType, TaskType, TodoTitleType} from "../Types";


type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

export type AppDispatchType = typeof store.dispatch

export type AppThunk<ReturnType=void>=ThunkAction<ReturnType,RootReducerType,unknown,ActionsType>

const persistState = loadState()

const composeEnhancers = composeWithDevTools({
    trace:true,
    traceLimit:10
});


let rootReducer = combineReducers({
    stateTodo: ToDoReducer
})


export let store = legacy_createStore(rootReducer, persistState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
    saveState(store.getState())
})

// @ts-ignore
window.store = store
