import {Provider} from "react-redux";
import {AppStateType, store} from "../Redux/ReduxStore";
import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    createStore,
    EmptyObject,
    legacy_createStore,
    PreloadedState,
    Store
} from "redux";
import {toDoReducer} from "../Redux/ToDoReducer";
import {StateType, TaskType, TodoTitleType} from "../Types";
import thunk from "redux-thunk";

type RootReducerType = typeof rootReducer
export type AppRootStateType=ReturnType<RootReducerType>
let rootReducer = combineReducers({
    stateTodo: toDoReducer
})

 let stateStories={
    tasksTitle: [{id: '123321', title: 'todo azaza', addedDate: 'string', order: 0, filter: 'All'}] as TodoTitleType[] ,
    taskBody: {
        ['123321']: {
            activeTasks: [{description: 'string | null', title: 'Active Task', status: 0, priority: 1, startDate: 'string | null', deadline: 'string | null', id: '321', todoListId: '123', order: 0, addedDate: '123'}] as TaskType[] ,
            completedTasks: [{description: 'string | null', title: 'Completed Task', status: 1, priority: 1, startDate: 'string | null', deadline: 'string | null', id: '21', todoListId: '123', order: 0, addedDate: '123'}] as TaskType[]
        }
    },
     offlineMode:true
}



 let storeForStoryBook = legacy_createStore(rootReducer, {stateTodo:stateStories} )

export const ProviderDecorators = (storiesFn: any) => <Provider store={storeForStoryBook}>{storiesFn()}</Provider>
