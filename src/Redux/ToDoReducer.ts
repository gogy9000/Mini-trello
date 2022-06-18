import {StateType, taskBodyType, TaskType, TodoTitleType} from "../Types";
import {API, TodoListItem} from "../DAL/TodoAPI";
import {AppStateType, AppThunk, store} from "./ReduxStore";
import {v1} from "uuid";

export const initialState: StateType =
    {
        tasksTitle: [] as Array<TodoTitleType>,
        taskBody: {
            // ['123']: {
            //     activeTasks: [] as Array<TaskType>,
            //         completedTasks: [] as Array<TaskType>
            // }

        },
        unauthorizedMode: false
    }

export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionsType<typeof actions>

export let ToDoReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case "CHANGE-FILTER":
            return {
                ...state,
                tasksTitle: state.tasksTitle.map(
                    (todo: TodoTitleType) => action.todoId === todo.id
                        ?
                        {
                            id: todo.id, title: todo.title, addedDate: todo.addedDate,
                            order: todo.order, filter: action.filter
                        }
                        :
                        todo
                )
            }


        case 'REMOVE-TODO':
            delete state.taskBody[action.idTitle]
            return {
                ...state,
                tasksTitle: state.tasksTitle.filter((title: TodoTitleType) => title.id !== action.idTitle),
            }

        case 'UPDATE-TODO-NAME':

            return {
                ...state,
                tasksTitle: [...state.tasksTitle.map((title: TodoTitleType) =>
                    title.id !== action.idTitle ?
                        title
                        : {
                            ...title,
                            title: action.titleName
                        })
                ],
                taskBody: {...state.taskBody}
            }

        case 'CREATE-NEW-TODO':
            return {
                ...state,
                tasksTitle: [...state.tasksTitle, {
                    ...action.payload,
                    filter: 'All'
                }],
                taskBody: {
                    ...state.taskBody,
                    [action.payload.id]: {
                        activeTasks: [],
                        completedTasks: []
                    }
                }
            }

        case 'ADD-TASK':

            return {
                ...state,
                tasksTitle: state.tasksTitle,
                taskBody: {
                    ...state.taskBody,
                    [action.newTask.todoListId]: {
                        // ...state.taskBody[action.newTask.todoListId],
                        activeTasks: [...state.taskBody[action.newTask.todoListId].activeTasks, action.newTask],
                        completedTasks: [...state.taskBody[action.newTask.todoListId].completedTasks]
                    }
                },
                //ты должен страдать от вложенности!!!
            };


        case 'UPDATE-TASK':

            let copyState: StateType = {
                ...state,
                tasksTitle: state.tasksTitle,
                taskBody: {
                    ...state.taskBody,
                    [action.updatedTask.todoListId]: {
                        activeTasks:
                            state.taskBody[action.updatedTask.todoListId].activeTasks.map(task =>
                                task.id === action.updatedTask.id ? action.updatedTask : task)
                        ,
                        completedTasks: [
                            ...state.taskBody[action.updatedTask.todoListId].completedTasks.map(task =>
                                task.id === action.updatedTask.id ? action.updatedTask : task)
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
                    [action.updatedTask.todoListId]: {
                        activeTasks: [
                            ...copyState.taskBody[action.updatedTask.todoListId].activeTasks
                                .filter((el: TaskType) => el.status === 0),
                            ...copyState.taskBody[action.updatedTask.todoListId].completedTasks
                                .filter((el: TaskType) => el.status === 0)
                        ],
                        completedTasks: [
                            ...copyState.taskBody[action.updatedTask.todoListId].completedTasks
                                .filter((el: TaskType) => el.status === 1),
                            ...copyState.taskBody[action.updatedTask.todoListId].activeTasks
                                .filter((el: TaskType) => el.status === 1)
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

            return {
                ...state,
                tasksTitle: action.payload.reduce((acc, todo: TodoListItem) => {
                    return [...acc,
                        {id: todo.id, title: todo.title, addedDate: todo.addedDate, order: todo.order, filter: "All"}]
                }, [] as TodoTitleType[]),

                taskBody: action.payload.reduce((acc, todo: TodoListItem) => {
                    return {...acc, [todo.id]: {activeTasks: [], completedTasks: []}}
                }, {})
            }

        case "REFRESH-TASKS":

            return {
                ...state,
                taskBody: action.tasks.reduce((acc: taskBodyType, tasksItem: TaskType) => {

                    if (tasksItem.status === 0) {
                        return {
                            ...acc,
                            [tasksItem.todoListId]: {
                                activeTasks: [tasksItem, ...acc[tasksItem.todoListId].activeTasks],
                                completedTasks: [...acc[tasksItem.todoListId].completedTasks],
                            }
                        }
                    } else {
                        return {
                            ...acc,
                            [tasksItem.todoListId]: {
                                activeTasks: [...acc[tasksItem.todoListId].activeTasks],
                                completedTasks: [tasksItem, ...acc[tasksItem.todoListId].completedTasks],
                            }
                        }
                    }


                }, state.taskBody)
            }
        case "CHANGE-UNAUTHORIZED-MODE":
            return {...state,unauthorizedMode:action.isUnauthorizedMode}


        default:
            return state

    }
}

export const actions = {
    changeFilterAC: (todoId: string, filter: string) => ({type: 'CHANGE-FILTER', todoId, filter} as const),
    removeTodoAC: (idTitle: string) => ({type: 'REMOVE-TODO', idTitle} as const),
    updateTodoNameAC: (titleName: string, idTitle: string) =>
        ({type: 'UPDATE-TODO-NAME', idTitle, titleName} as const),
    createNewTodoAC: (payload: TodoListItem) => ({type: 'CREATE-NEW-TODO', payload} as const),
    deleteTaskAC: (id: string, idTitle: string) => ({type: 'DELETE-TASK', id, idTitle} as const),
    addTaskAC: (item: any) => ({
        type: 'ADD-TASK',
        newTask: item
    } as const),
    updateTaskAC: (updatedTask: TaskType) => ({type: 'UPDATE-TASK', updatedTask} as const),
    refreshTodoListAC: (payload: TodoListItem[]) => ({type: 'REFRESH-TODOLIST', payload} as const),
    refreshTasks: (tasks: TaskType[]) => ({type: 'REFRESH-TASKS', tasks} as const),
    changeUnauthorizedMode:(isUnauthorizedMode:boolean)=>({type:'CHANGE-UNAUTHORIZED-MODE',isUnauthorizedMode}as const)
}


export const thunks = {

    getTodolistAndTasks: () => (dispatch:(action: ActionsType) => void,getState:()=> AppStateType) => {
        if (getState().stateTodo.unauthorizedMode) {
            return
        }else {
            API.getTodoList()
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(actions.refreshTodoListAC(response.data))

                        response.data.forEach((dataItem: TodoListItem) => {
                            API.getTasks(dataItem.id)
                                .then((props) => {
                                    if (props.status === 200) {
                                        dispatch(actions.refreshTasks(props.tasks))
                                    } else {
                                        console.log(props.statusText)
                                    }
                                })
                                .catch((err) => console.log(err.message))
                        })
                    } else {
                        console.log(response.statusText)
                    }
                }).catch((err) => console.log(err.message))
        }
    },

    createTodolistTC: (title: string) =>
        (dispatch: (action: ActionsType) => void,getState:()=> AppStateType) => {
        if (getState().stateTodo.unauthorizedMode) {
            dispatch(
                actions.createNewTodoAC(
                    {id: v1(), title: title, addedDate: JSON.stringify(new Date()), order: 0}
                )
            )
        } else {
            API.createTodoList(title)
                .then((props) => {
                    if (props.resultCode === 0) {
                        dispatch(actions.createNewTodoAC(props.TodoListItem))
                    } else {
                        console.log(props.messages)
                    }
                }).catch((err) => console.log(err.message))
        }
    },

    updateTodoList: (todolistId: string, title: string) => (dispatch: (action: ActionsType) => void,getState:()=> AppStateType) => {
        if (getState().stateTodo.unauthorizedMode) {
            dispatch(actions.updateTodoNameAC(title, todolistId))
        } else {
            API.updateTodoLis(todolistId, title).then((resp) => {
                if (resp.data.resultCode === 0) {
                    dispatch(actions.updateTodoNameAC(title, todolistId))
                } else {
                    console.log(resp.data.messages)
                }
            }).catch((err) => console.log(err.message))
        }
    },

    deleteTodolist: (todolistId: string) => (dispatch: (action: ActionsType) => void,getState:()=> AppStateType) => {
        if (getState().stateTodo.unauthorizedMode) {
            dispatch(actions.removeTodoAC(todolistId))
        } else {
            API.deleteTodoList(todolistId).then((resp) => {
                    console.log(resp.data.resultCode)
                    if (resp.data.resultCode === 0) {
                        dispatch(actions.removeTodoAC(todolistId))
                    } else {
                        console.log(resp.data.messages)
                    }
                }
            ).catch((err) => console.log(err.message))
        }
    },

    addTaskTC: (todolistId: string, taskTitle: string) => (dispatch: (action: ActionsType) => void,getState:()=> AppStateType) => {
        if (getState().stateTodo.unauthorizedMode) {
            dispatch(actions.addTaskAC({
                        description: null,
                        title: taskTitle,
                        status: 0,
                        priority: 0,
                        startDate: null,
                        deadline: null,
                        id: v1(),
                        todoListId: todolistId,
                        order: 0,
                        addedDate: JSON.stringify(new Date())
                    }
                )
            )
        } else {
            API.createNewTask(todolistId, taskTitle)
                .then((props) => {
                        if (props.resultCode === 0) {
                            dispatch(actions.addTaskAC(props.createdTask))
                        } else {
                            console.log(props.messages)
                        }
                    }
                ).catch((err) => console.log(err.message))
        }
    },

    updateTask: (task: TaskType) => (dispatch: (action: ActionsType) => void,getState:()=> AppStateType) => {
        if (getState().stateTodo.unauthorizedMode) {
            dispatch(actions.updateTaskAC(task))
        } else {
            API.updateTask(task).then((props) => {
                    if (props.resultCode === 0) {
                        dispatch(actions.updateTaskAC(props.newTask))
                    } else {
                        console.log(props.messages)
                    }
                }
            ).catch((err) => console.log(err.message))
        }
    },

    deleteTask: (todolistId: string, taskId: string) => (dispatch: (action: ActionsType) => void,getState:()=> AppStateType) => {
        if (getState().stateTodo.unauthorizedMode) {
            dispatch(actions.deleteTaskAC(taskId, todolistId))
        } else {
            API.deleteTask(todolistId, taskId).then((resp) => {
                    if (resp.data.resultCode === 0) {
                        dispatch(actions.deleteTaskAC(taskId, todolistId))
                    } else {
                        console.log(resp.data.messages)
                    }
                }
            ).catch((err) => console.log(err.message))
        }
    }
}



