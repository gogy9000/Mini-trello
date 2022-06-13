import {Provider} from "react-redux";
import {AppStateType, store} from "../Redux/ReduxStore";
import {combineReducers, createStore } from "redux";
import {ToDoReducer} from "../Redux/ToDoReducer";
import {StateType, TaskType, TodoTitleType} from "../Types";

// type RootReducerType = typeof rootReducer
// export type AppRootStateType=ReturnType<RootReducerType>



// const rootReducer = combineReducers({state:ToDoReducer})

// let id = '123'
// let state={
//     tasksTitle: [{id: '123', titleName: 'empty todo', filter: 'All'}] as Array<TodoTitleType> ,
//     taskBody: {
//         ['123']: {
//             activeTasks: [] as Array<TaskType>,
//             completedTasks: [] as Array<TaskType>
//         }
//     }
// }


// let storeForStoryBook = createStore(rootReducer, state as unknown as AppStateType)

export const ProviderDecorators = (storiesFn: any) => <Provider store={store}>{storiesFn()}</Provider>
