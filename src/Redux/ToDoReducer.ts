import {StateType, TaskType, TodoTitleType} from "../Types";

import {v1} from 'uuid';
import {todoListAPI, TodoListItem} from "../DAL/TodoAPI";
import {Dispatch} from "redux";


export const initialState: StateType =
    {
        tasksTitle: [] as Array<TodoTitleType>,
        taskBody: {
            // ['123']: {
            //     activeTasks: [] as Array<TaskType>,
            //         completedTasks: [] as Array<TaskType>
            // }
        }
    }


export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionsType<typeof actions>

export let ToDoReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        // case "CHANGE-FILTER":
        //     return {...state,
        //     tasksTitle:state.tasksTitle.map((todo:TodoTitleType)=> action.todoId===todo.id?
        //         {id:todo.id, titleName:todo.title, filter:action.filter}:todo)
        //     }

        case 'UPDATE-TASK':
            return {
                ...state,
                taskBody: {
                    ...state.taskBody,
                    [action.idTitle]: {
                        activeTasks:
                            state.taskBody[action.idTitle].activeTasks.map(
                                (task: TaskType) => task.id === action.taskId
                                    ? {id: task.id, title: action.taskValue, isDone: task.isDone}
                                    : task),
                        completedTasks:
                            state.taskBody[action.idTitle].completedTasks.map(
                                (task: TaskType) => task.id === action.taskId
                                    ? {id: task.id, title: action.taskValue, isDone: task.isDone}
                                    : task)
                    }
                }
            }


        case 'REMOVE-TODO':
            delete state.taskBody[action.idTitle]
            return {
                ...state,
                tasksTitle: state.tasksTitle.filter((title: TodoTitleType) => title.id != action.idTitle),
            }

        case 'UPDATE-TODO-NAME':

            return {
                ...state,
                tasksTitle: [...state.tasksTitle.map((title: TodoTitleType) =>
                    title.id !== action.idTitle ?
                        title
                        : {id: title.id, title: action.titleName, addedDate: title.addedDate, order: title.order})
                ],
                taskBody: {...state.taskBody}
            }

        case 'CREATE-NEW-TODO':

            return {
                ...state,
                tasksTitle: [...state.tasksTitle, action.payload],
                taskBody: {
                    ...state.taskBody,
                    [action.payload.id]: {
                        activeTasks: [],
                        completedTasks: []
                    }
                }
            }

        case 'ADD-TASK':

            let newTask = {
                id: action.taskId,
                title: action.inputText.trim(),
                isDone: false
            };

            return {
                ...state,
                tasksTitle: state.tasksTitle,
                taskBody: {
                    ...state.taskBody,
                    [action.idTitle]: {
                        activeTasks: [...state.taskBody[action.idTitle].activeTasks, newTask],
                        completedTasks: [...state.taskBody[action.idTitle].completedTasks]
                    }
                },
                //ты должен страдать от вложенности!!!
            };


        case 'CHECK-TASK':


            let copyState: StateType = {
                ...state,
                tasksTitle: state.tasksTitle,
                // @ts-ignore
                taskBody: {
                    ...state.taskBody,
                    [action.idTitle]: {
                        activeTasks: [
                            ...state.taskBody[action.idTitle].activeTasks.map(task =>

                                task.id === action.id ?
                                    task.isDone ?
                                        {task, isDone: false} : {...task, isDone: true} : task)
                        ],
                        completedTasks: [
                            ...state.taskBody[action.idTitle].completedTasks.map(task =>

                                task.id === action.id ?
                                    task.isDone ?
                                        {...task, isDone: false} : {...task, isDone: true} : task)
                        ]
                    }
                }
                ,
            };

            return {
                ...copyState,
                tasksTitle: copyState.tasksTitle,
                taskBody: {
                    ...copyState.taskBody,
                    [action.idTitle]: {
                        activeTasks: [
                            ...copyState.taskBody[action.idTitle].activeTasks.filter((el: TaskType) => !el.isDone),
                            ...copyState.taskBody[action.idTitle].completedTasks.filter((el: TaskType) => !el.isDone)
                        ],
                        completedTasks: [
                            ...copyState.taskBody[action.idTitle].completedTasks.filter((el: TaskType) => el.isDone),
                            ...copyState.taskBody[action.idTitle].activeTasks.filter((el: TaskType) => el.isDone)
                        ]
                        //страдааай!!!
                    }
                },
            };

        case 'DELETE-TASK':

            return {
                ...state,
                taskBody: {
                    ...state.taskBody,
                    [action.idTitle]: {
                        activeTasks: [...state.taskBody[action.idTitle].activeTasks.filter(task =>
                            task.id !== action.id)],
                        completedTasks: [...state.taskBody[action.idTitle].completedTasks.filter(task =>
                            task.id !== action.id)]
                    }
                    //не так уж и страшно впринципе
                },
            }

        case "REFRESH-TODOLIST":

          let newTaskBody =action.payload.reduce((acc:any,todo:TodoListItem)=>{
              return {...acc,[todo.id]:{activeTasks: [], completedTasks: []}}
          },{})
            console.log(newTaskBody)
            return {tasksTitle: action.payload,taskBody:newTaskBody}
                // taskBody: {action.payload.map((TodoItem:TodoListItem)=> {
                //        return {[TodoItem.id]: {activeTasks: [], completedTasks: []}}
                //     })
                //
                //
                // }






default:
    return state

}
}

export const actions = {
    // changeFilterAC:(todoId:string, filter:string)=>({type:'CHANGE-FILTER', todoId,filter}as const),
    updateTaskAC: (idTitle: string, taskId: string, taskValue: string) => ({
        type: 'UPDATE-TASK',
        idTitle,
        taskId,
        taskValue
    } as const),
    removeTodoAC: (idTitle: string) => ({type: 'REMOVE-TODO', idTitle} as const),
    updateTodoNameAC: (titleName: string, idTitle: string) =>
        ({type: 'UPDATE-TODO-NAME', idTitle, titleName} as const),
    createNewTodoAC: (payload: TodoListItem) => ({type: 'CREATE-NEW-TODO', payload} as const),
    deleteTaskAC: (id: string, idTitle: string) => ({type: 'DELETE-TASK', id, idTitle} as const),
    addTaskAC: (idTitle: string, inputText: string) => ({
        type: 'ADD-TASK',
        idTitle,
        inputText,
        taskId: v1()
    } as const),
    checkTaskAC: (id: string, idTitle: string) => ({type: 'CHECK-TASK', id, idTitle} as const),
    refreshTodoListAC: (payload:TodoListItem[]) => ({type: 'REFRESH-TODOLIST', payload} as const)
}

export const getTodolistTC = () => (dispatch:(action: ActionsType) => void) => {
    todoListAPI.getTodoList()
        .then((data) => {
            dispatch(actions.refreshTodoListAC(data))

            return data
        })
        .then((data)=>{
            data.forEach((dataItem)=>{
                todoListAPI.getTasks(dataItem.id)
                    .then((res)=>{
                        console.log(res)
                    })

            })

        })
}
export const createTodolistTC = (title: string) => (dispatch: (action: ActionsType) => void) => {

    todoListAPI.createTodoList(title)
        .then((data) => {
            console.log(data)
            let {id, order, title, addedDate} = data
            dispatch(actions.createNewTodoAC(data))
        })
}



