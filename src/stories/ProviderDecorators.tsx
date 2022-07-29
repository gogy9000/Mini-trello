import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {toDoReducer} from "../Redux/ToDoReducer";
import {TaskType, TodoTitleType} from "../Types";
import {configureStore} from "@reduxjs/toolkit";


type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
let rootReducer = combineReducers({
    stateTodo: toDoReducer
})

let stateStories = {
    tasksTitle: [{id: '123321', title: 'todo azaza', addedDate: 'string', order: 0, filter: 'All'}] as TodoTitleType[],
    taskBody: {
        ['123321']:  [{
                description: 'string | null',
                title: 'Active Task',
                status: 0,
                priority: 1,
                startDate: 'string | null',
                deadline: 'string | null',
                id: '321',
                todoListId: '123',
                order: 0,
                addedDate: '123'
            }] as TaskType[],
    },
    offlineMode: true
}


let storeForStoryBook = configureStore({
    reducer:rootReducer,
    preloadedState: {stateTodo: stateStories}
})

export const ProviderDecorators = (storiesFn: any) => <Provider store={storeForStoryBook}>{storiesFn()}</Provider>
