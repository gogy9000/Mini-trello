import {Provider} from "react-redux";
import {combineReducers} from "redux";
import {toDoReducer} from "../Redux/Todo/ToDoReducer";
import {TaskType, TodoTitleType} from "../Types";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../Redux/Application/AppReducer";
import {authReducer} from "../Redux/auth/Auth";


type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
let rootReducer = combineReducers({
    toDoReducer: toDoReducer,
    appReducer,
    authReducer
})

let stateStories:AppRootStateType["toDoReducer"] = {
    tasksTitle: [{_id: '123321', title: 'todo azaza', addedDate: 'string', order: 0, filter: 'All'}] as TodoTitleType[],
    taskBody: {
        ['123321']:  [{
                description: 'string | null',
                title: 'Active Task',
                status: 0,
                priority: 1,
                startDate: 'string | null',
                deadline: 'string | null',
                _id: '321',
                todoListId: '123',
                order: 0,
                addedDate: '123'
            }] as TaskType[],
    },
    offlineMode: true,
    waitingList:{},
    isFetching:false,
    errors:[]
}


let storeForStoryBook = configureStore({
    reducer:rootReducer,
    preloadedState: {toDoReducer: stateStories}
})

export const ProviderDecorators = (storiesFn: any) => <Provider store={storeForStoryBook}>{storiesFn()}</Provider>
