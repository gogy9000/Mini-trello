import {Provider} from "react-redux";
import {AppStateType, store} from "../Redux/ReduxStore";
import {AnyAction, applyMiddleware, combineReducers, createStore, EmptyObject, Store} from "redux";
import {ToDoReducer} from "../Redux/ToDoReducer";
import {StateType, TaskType, TodoTitleType} from "../Types";
import thunk from "redux-thunk";

type RootReducerType = typeof ToDoReducer
export type AppRootStateType=ReturnType<RootReducerType>


let id = '123'
let state={
    tasksTitle: [{id: id, title: 'todo azaza', addedDate: 'string', order: 0, filter: 'All'}] ,
    taskBody: {
        [id]: {
            activeTasks: [] ,
            completedTasks: []
        }
    }
}



let storeForStoryBook = createStore(ToDoReducer, state as AppRootStateType);

export const ProviderDecorators = (storiesFn: any) => <Provider store={storeForStoryBook}>{storiesFn()}</Provider>
