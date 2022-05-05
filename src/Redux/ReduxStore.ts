import {combineReducers, createStore} from "redux";
import {taskBlockReducer} from "./ToDoReducer";


let rootReducer= combineReducers({
    stateTaskBlock:taskBlockReducer
})

export let store= createStore(rootReducer)