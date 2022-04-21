import {StateType, Task1Type, taskTitle} from "../Types";
import {v1} from 'uuid'

export let taskIdWhat = v1()
export let taskIdWho = v1()

const initialState: StateType = {
    tasksTitle: [
        {id: taskIdWhat, titleName: 'what?'},
        {id: taskIdWho, titleName: 'who?'},] as Array<taskTitle>,

    taskBody: {
        [taskIdWhat]: {
            activeTasks: [{id: 'string', title: 'string', isDone: false}] as Array<Task1Type>,
            completedTasks: [] as Array<Task1Type>
        },
        [taskIdWho]: {
            activeTasks: [] as Array<Task1Type>,
            completedTasks: [] as Array<Task1Type>
        }
    },
}

export let taskBlockReducer = (state: StateType = initialState, action: any) => {
    switch (action.type) {

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
type deleteTaskACType = { type: typeof DELETE_TASK, id: string, idTitle: string }
const DELETE_TASK = 'DELETE-TASK'
export const deleteTaskAC = (id: string, idTitle: string): deleteTaskACType => ({type: DELETE_TASK, id, idTitle})



type  addTaskACType = { type: typeof ADD_TASK, idTitle: string,inputText:string }
const ADD_TASK = 'ADD-TASK'
export const addTaskAC = (idTitle: string,inputText:string): addTaskACType => ({type: ADD_TASK, idTitle,inputText})



export type checkTaskACType = { type: typeof CHECK_TASK, id: string, idTitle: string }
const CHECK_TASK = 'CHECK-TASK'
export const checkTaskAC = (id: string, idTitle: string): checkTaskACType => ({type: CHECK_TASK, id, idTitle})



