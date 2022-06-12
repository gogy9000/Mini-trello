import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ToDoReducer} from './ToDoReducer';
import {loadState, saveState} from "../local-storage-utils/Local-storage-utils";
import thunk from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";


type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch

const persistState = loadState()


let rootReducer = combineReducers({
    stateTodo: ToDoReducer
})

export let store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => {
    saveState(store.getState())
})

// @ts-ignore
window.store = store
