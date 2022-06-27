import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ActionsType, toDoReducer} from './ToDoReducer';
import {loadState, saveState} from "../local-storage-utils/Local-storage-utils";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {appReducer} from "./AppReducer";


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType>

export type AppThunk<ReturnType=void>=ThunkAction<ReturnType,AppRootStateType,unknown,ActionsType>

const persistState = loadState()

const composeEnhancers = composeWithDevTools({
    trace:true,
    traceLimit:10
});


let rootReducer = combineReducers({
    ToDoReducer: toDoReducer,
    appReducer
})


export let store = legacy_createStore(rootReducer, persistState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
    saveState(store.getState())
})

// @ts-ignore
window.store = store
