import {combineReducers, createStore} from "redux";
import {taskBlockReducer} from "./TaskBlokReducer";


let rootReducer= combineReducers({
    stateTaskBlock:taskBlockReducer
})

export let store= createStore(rootReducer)