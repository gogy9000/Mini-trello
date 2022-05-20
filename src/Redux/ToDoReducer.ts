import {StateType, Task1Type, TaskTitleType} from "../Types";

import {v1} from 'uuid';


export const initialState: StateType = {
    tasksTitle: [] as Array<TaskTitleType>,

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

export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionsType<typeof actions>

export let ToDoReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case "CHANGE-FILTER":
            return {...state,
            tasksTitle:state.tasksTitle.map((todo:TaskTitleType)=> action.todoId===todo.id?
                {id:todo.id, titleName:todo.titleName, filter:action.filter}:todo)
            }

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
                tasksTitle: state.tasksTitle.filter((title: TaskTitleType) => title.id != action.idTitle),
            }

        case 'UPDATE-TODO-NAME':

            return {
                ...state,
                tasksTitle: [...state.tasksTitle.map((title: TaskTitleType) =>
                    title.id !== action.idTitle ?
                        title
                        : {id: title.id, titleName: action.titleName, filter:title.filter})
                ],
                taskBody: {...state.taskBody}
            }

        case 'CREATE-NEW-TODO':
            let todoId = action.toDoId
            return {
                ...state,
                tasksTitle: [...state.tasksTitle, {id: todoId, titleName: action.todoName, filter: 'all'}],
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
                        activeTasks: [...state.taskBody[action.idTitle].activeTasks.filter(task =>
                            task.id !== action.id)],
                        completedTasks: [...state.taskBody[action.idTitle].completedTasks.filter(task =>
                            task.id !== action.id)]
                    }
                    //не так уж и страшно впринципе
                },
            }

        default:
            return state

    }
}

export const actions = {
    changeFilterAC:(todoId:string, filter:string)=>({type:'CHANGE-FILTER', todoId,filter}as const),
    updateTaskAC: (idTitle: string, taskId: string, taskValue: string) => ({
        type: 'UPDATE-TASK',
        idTitle,
        taskId,
        taskValue
    } as const),
    removeTodoAC: (idTitle: string) => ({type: 'REMOVE-TODO', idTitle} as const),
    updateTodoNameAC: (titleName: string, idTitle: string) =>
        ({type: 'UPDATE-TODO-NAME', idTitle, titleName} as const),
    createNewTodoAC: (todoName: string) => ({type: 'CREATE-NEW-TODO', todoName, toDoId: v1()} as const),
    deleteTaskAC: (id: string, idTitle: string) => ({type: 'DELETE-TASK', id, idTitle} as const),
    addTaskAC: (idTitle: string, inputText: string) => ({
        type: 'ADD-TASK',
        idTitle,
        inputText,
        taskId:v1()
    } as const),
    checkTaskAC: (id: string, idTitle: string) => ({type: 'CHECK-TASK', id, idTitle} as const)
}

