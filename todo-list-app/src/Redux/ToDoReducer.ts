import {StateType, Task1Type, taskTitle} from "../Types";

import { v1  } from 'uuid';


const initialState: StateType = {
    tasksTitle: [] as Array<taskTitle>,

    taskBody: {
        // [taskIdWhat]: {
        //     activeTasks: [] as Array<Task1Type>,
        //     completedTasks: [] as Array<Task1Type>
        // },
        // [taskIdWho]: {
        //     activeTasks: [] as Array<Task1Type>,
        //     completedTasks: [] as Array<Task1Type>
        // }
    },
}

export let taskBlockReducer = (state: StateType = initialState, action: any) => {

    switch (action.type) {

        case 'UPDATE-TASK':
            return {
                ...state,
                taskBody: {
                    ...state.taskBody,
                    [action.idTitle]: {
                        activeTasks:
                            state.taskBody[action.idTitle].activeTasks.map(
                                (task: Task1Type) => task.id === action.taskId
                                    ? {id: task.id, title: action.taskValue, isDone: task.isDone}
                                    : task),
                        completedTasks:
                            state.taskBody[action.idTitle].completedTasks.map(
                                (task: Task1Type) => task.id === action.taskId
                                    ? {id: task.id, title: action.taskValue, isDone: task.isDone}
                                    : task)
                    }
                }
            }


        case 'REMOVE-TODO':
            delete state.taskBody[action.idTitle]
            return {
                ...state,
                tasksTitle: state.tasksTitle.filter((title: taskTitle) => title.id != action.idTitle),
            }

        case 'UPDATE-TODO-NAME':
            debugger
            return {
                ...state,
                tasksTitle: [...state.tasksTitle.map((title: taskTitle) =>
                    title.id !== action.idTitle ?
                        title
                        : {id: action.idTitle, titleName: action.titleName})
                ],
                taskBody: {...state.taskBody}
            }

        case 'CREATE-NEW-TODO':
            let todoId = v1()
            return {
                ...state,
                tasksTitle: [...state.tasksTitle, {id: todoId, titleName: action.todoName}],
                taskBody: {
                    ...state.taskBody,
                    [todoId]: {
                        activeTasks: [],
                        completedTasks: []
                    }
                }
            }

        case 'ADD-TASK':

            let newTask = {
                id: v1(),
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
                            ...copyState.taskBody[action.idTitle].activeTasks.filter((el: Task1Type) => !el.isDone),
                            ...copyState.taskBody[action.idTitle].completedTasks.filter((el: Task1Type) => !el.isDone)
                        ],
                        completedTasks: [
                            ...copyState.taskBody[action.idTitle].completedTasks.filter((el: Task1Type) => el.isDone),
                            ...copyState.taskBody[action.idTitle].activeTasks.filter((el: Task1Type) => el.isDone)
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
                        activeTasks: [...state.taskBody[action.idTitle].activeTasks.filter(task => task.id !== action.id)],
                        completedTasks: [...state.taskBody[action.idTitle].completedTasks.filter(task => task.id !== action.id)]
                    }
                    //не так уж и страшно впринципе
                },
            }

        default:
            return state

    }
}
type updateTaskACType={type:typeof UPDATE_TASK, idTitle: string, taskId: string, taskValue: string }
const UPDATE_TASK = 'UPDATE-TASK'
export const updateTaskAC = (idTitle: string, taskId: string, taskValue: string):updateTaskACType => ({
    type: UPDATE_TASK,
    idTitle,
    taskId,
    taskValue
})


type removeTodoACType = { type: typeof REMOVE_TODO, idTitle: string }
const REMOVE_TODO = 'REMOVE-TODO'
export const removeTodoAC = (idTitle: string): removeTodoACType => ({type: REMOVE_TODO, idTitle})


type updateTodoNameACType = { type: typeof UPDATE_TODO_NAME, titleName: string, idTitle: string }
const UPDATE_TODO_NAME = 'UPDATE-TODO-NAME'
export const updateTodoNameAC = (titleName: string, idTitle: string): updateTodoNameACType =>
    ({type: UPDATE_TODO_NAME, idTitle, titleName})


type createNewTodoACType = { type: typeof CREATE_NEW_TODO, todoName: string }
const CREATE_NEW_TODO = 'CREATE-NEW-TODO'
export const createNewTodoAC = (todoName: string): createNewTodoACType => ({type: CREATE_NEW_TODO, todoName})


type deleteTaskACType = { type: typeof DELETE_TASK, id: string, idTitle: string }
const DELETE_TASK = 'DELETE-TASK'
export const deleteTaskAC = (id: string, idTitle: string): deleteTaskACType => ({type: DELETE_TASK, id, idTitle})


type  addTaskACType = { type: typeof ADD_TASK, idTitle: string, inputText: string }
const ADD_TASK = 'ADD-TASK'
export const addTaskAC = (idTitle: string, inputText: string): addTaskACType => ({
    type: ADD_TASK,
    idTitle,
    inputText
})


export type checkTaskACType = { type: typeof CHECK_TASK, id: string, idTitle: string }
const CHECK_TASK = 'CHECK-TASK'
export const checkTaskAC = (id: string, idTitle: string): checkTaskACType => ({type: CHECK_TASK, id, idTitle})



