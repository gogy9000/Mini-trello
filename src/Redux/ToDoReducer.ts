import {StateType, taskBodyType, TaskType, TodoTitleType} from "../Types";
import {API, TaskItem, TodoListItem} from "../DAL/TodoAPI";
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
        offlineMode: false
    }

export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionsType<typeof actions>

export let ToDoReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case TodoTypes.changeFilter:
            return {
                ...state,
                tasksTitle: state.tasksTitle.map(
                    (todo: TodoTitleType) => action.todoId === todo.id
                        ?
                        {...todo, filter: action.filter}
                        :
                        todo
                )
            }


        case TodoTypes.removeTodo:
            delete state.taskBody[action.idTitle]
            return {
                ...state,
                tasksTitle: state.tasksTitle.filter((title: TodoTitleType) => title.id !== action.idTitle),
            }

        case TodoTypes.updateTodoName:

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

        case TodoTypes.createNewTodo:
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

        case TodoTypes.addTask:

            return {
                ...state,
                tasksTitle: state.tasksTitle,
                taskBody: {
                    ...state.taskBody,
                    [action.newTask.todoListId]: {
                        ...state.taskBody[action.newTask.todoListId],
                        activeTasks: [...state.taskBody[action.newTask.todoListId].activeTasks, action.newTask],
                    }
                },
                //ты должен страдать от вложенности!!!
            };


        case TodoTypes.updateTask:

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
                        completedTasks:
                            state.taskBody[action.updatedTask.todoListId].completedTasks.map(task =>
                                task.id === action.updatedTask.id ? action.updatedTask : task)

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

        case TodoTypes.deleteTask:
            return {
                ...state,
                taskBody: {
                    ...state.taskBody,
                    [action.idTitle]: {
                        activeTasks: state.taskBody[action.idTitle].activeTasks.filter(task =>
                            task.id !== action.id),
                        completedTasks: state.taskBody[action.idTitle].completedTasks.filter(task =>
                            task.id !== action.id)
                    }
                    //не так уж и страшно впринципе
                },
            }

        case TodoTypes.refreshTodolist:

            return {
                ...state,
                tasksTitle: action.payload.reduce((acc, todo: TodoListItem) => {
                    return [...acc, {...todo, filter: "All"}]}, [] as TodoTitleType[]),

                taskBody: action.payload.reduce((acc, todo: TodoListItem) => {
                    return {...acc, [todo.id]: {activeTasks: [], completedTasks: []}}
                }, {})
            }

        case TodoTypes.refreshTask:

            return {
                ...state,
                taskBody: action.tasks.reduce((acc: taskBodyType, tasksItem: TaskType) => {

                    if (tasksItem.status === 0) {
                        return {
                            ...acc,
                            [tasksItem.todoListId]: {
                                ...acc[tasksItem.todoListId],
                                activeTasks: [tasksItem, ...acc[tasksItem.todoListId].activeTasks],
                                // completedTasks: [...acc[tasksItem.todoListId].completedTasks],
                            }
                        }
                    } else {
                        return {
                            ...acc,
                            [tasksItem.todoListId]: {
                                ...acc[tasksItem.todoListId],
                                // activeTasks: [...acc[tasksItem.todoListId].activeTasks],
                                completedTasks: [tasksItem, ...acc[tasksItem.todoListId].completedTasks],
                            }
                        }
                    }


                }, state.taskBody)
            }
        case TodoTypes.changeUnauthorizedMode:
            return {...state, offlineMode: action.offlineMode}


        default:
            return state

    }
}
 export enum TodoTypes {
    changeFilter= 'CHANGE-FILTER',
    removeTodo='REMOVE-TODO',
    updateTodoName='UPDATE-TODO-NAME',
    createNewTodo='CREATE-NEW-TODO',
    deleteTask='DELETE-TASK',
    addTask='ADD-TASK',
    updateTask='UPDATE-TASK',
    refreshTodolist='REFRESH-TODOLIST',
    refreshTask='REFRESH-TASKS',
    changeUnauthorizedMode='CHANGE-UNAUTHORIZED-MODE'
}

export const actions = {
    changeFilterAC: (todoId: string, filter: string) => ({type: TodoTypes.changeFilter, todoId, filter} as const),
    removeTodoAC: (idTitle: string) => ({type: TodoTypes.removeTodo, idTitle} as const),
    updateTodoNameAC: (titleName: string, idTitle: string) =>
        ({type: TodoTypes.updateTodoName, idTitle, titleName} as const),
    createNewTodoAC: (payload: TodoListItem) => ({type: TodoTypes.createNewTodo, payload} as const),
    deleteTaskAC: (id: string, idTitle: string) => ({type: TodoTypes.deleteTask, id, idTitle} as const),
    addTaskAC: (item: TaskType) => ({type: TodoTypes.addTask, newTask: item} as const),
    updateTaskAC: (updatedTask: TaskType) => ({type: TodoTypes.updateTask, updatedTask} as const),
    refreshTodoListAC: (payload: TodoListItem[]) => ({type: TodoTypes.refreshTodolist, payload} as const),
    refreshTasks: (tasks: TaskType[]) => ({type: TodoTypes.refreshTask, tasks} as const),
    changeOfflineMode: (offlineMode: boolean) => ({
        type: TodoTypes.changeUnauthorizedMode,
        offlineMode
    } as const)
}


export const thunks = {
    //воот такенная санка!
    //нужна для отправки на сервер тех задач которые были созданы в offline режиме(в offline режиме
    //задачи сохраняются только в локальном хранилище,в локальном хранилище данные сохраняются всегда по умолчанию)
    //при переключении с offline режима на не offline запускается санка которая создает на сервере новые
    // тудулисты переносит в них таски которые были созданы в offline режиме, дожидается когда все тудулисты
    // и таски будут перенесены на сервер, после чего удаляет все, что было перенесено на сервер для того что бы не было
    // дублирования. Если в существующий на сервере тудулист были записаны задачи в offline режиме, переносит
    // их также на сервер
    synchronizeTodo: () => (dispatch: (action: ActionsType) => void, getState: () => AppStateType) => {
        getState().stateTodo.tasksTitle.forEach((todo) => {
                if (todo.isASynchronizedTodo) {
                    API.createTodoList(todo.title).then((props) => {

                            if (props.resultCode === 0) {
                                dispatch(actions.createNewTodoAC(props.TodoListItem))

                                let activeTasksPromise = new Promise((resolve, reject) => {

                                    if (getState().stateTodo.taskBody[todo.id].activeTasks.length === 0) {
                                        reject('activeTasks-empty')
                                    }

                                    getState().stateTodo.taskBody[todo.id].activeTasks.forEach(
                                        (task, i, arr) => {

                                            if (task.isASynchronizedTask) {
                                                API.createNewTask(props.TodoListItem.id, task.title)
                                                    .then((props) => {
                                                        dispatch(actions.addTaskAC(props.createdTask))
                                                        if (i === arr.length - 1) {
                                                            resolve('success')
                                                        }
                                                    }).catch((err) => console.log(err.message))
                                            }
                                        }
                                    )
                                })

                                let completedTasksPromise = new Promise((resolve, reject) => {

                                    if (getState().stateTodo.taskBody[todo.id].completedTasks.length === 0) {
                                        reject('completedTasks-empty')
                                    }

                                    getState().stateTodo.taskBody[todo.id].completedTasks.forEach(
                                        (task, index, array) => {

                                            if (task.isASynchronizedTask) {
                                                API.createNewTask(props.TodoListItem.id, task.title)
                                                    .then((props) => {
                                                        dispatch(actions.addTaskAC(props.createdTask))

                                                        return props.createdTask
                                                    }).then((createdTask) => {
                                                    API.updateTask({...createdTask, status: 1})
                                                        .then((props) => {
                                                                if (props.resultCode === 0) {

                                                                    dispatch(actions.updateTaskAC(props.newTask))
                                                                } else {
                                                                    console.log(props.messages)
                                                                }
                                                            }
                                                        ).catch((err) => console.log(err.message))
                                                    if (index === array.length - 1) {
                                                        resolve('success')
                                                    }
                                                }).catch((err) => console.log(err.message))
                                            }
                                        }
                                    )
                                })
                                Promise.allSettled([activeTasksPromise, completedTasksPromise])
                                    .then((value) => {
                                        console.log(value)
                                        dispatch(actions.removeTodoAC(todo.id))
                                    })
                            } else {
                                console.log(props.messages)
                            }
                        }
                    ).catch((err) => console.log(err.message))
                }
                if (!todo.isASynchronizedTodo) {
                    console.log(!todo.isASynchronizedTodo)
                    getState().stateTodo.taskBody[todo.id].activeTasks.forEach((task)=>{
                       if(task.isASynchronizedTask){
                           API.createNewTask(todo.id,task.title).then((props) => {
                                   console.log(props.createdTask)
                                   if (props.resultCode === 0) {
                                       dispatch(actions.addTaskAC(props.createdTask))
                                       dispatch(actions.deleteTaskAC(task.id,todo.id))
                                   } else {
                                       console.log(props.messages)
                                   }
                               }
                           ).catch((err) => console.log(err.message))
                       }
                    })

                    getState().stateTodo.taskBody[todo.id].completedTasks.forEach((task)=>{
                        if(task.isASynchronizedTask){
                            API.createNewTask(todo.id,task.title).then((props) => {
                                    console.log(props.createdTask)
                                    if (props.resultCode === 0) {
                                        dispatch(actions.addTaskAC(props.createdTask))
                                        dispatch(actions.deleteTaskAC(task.id,todo.id))

                                    } else {
                                        console.log(props.messages)
                                    }
                                    return props.createdTask
                                }
                            ).then((createdTask) => {
                                API.updateTask({...createdTask, status: 1})
                                    .then((props) => {
                                            if (props.resultCode === 0) {

                                                dispatch(actions.updateTaskAC(props.newTask))
                                            } else {
                                                console.log(props.messages)
                                            }
                                        }
                                    ).catch((err) => console.log(err.message))

                            }).catch((err) => console.log(err.message))
                        }
                    })
                }
            }
        )

    },

    getTodolistAndTasks: () => (dispatch: (action: ActionsType) => void, getState: () => AppStateType) => {
        if (getState().stateTodo.offlineMode) {
            return
        } else {
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
        (dispatch: (action: ActionsType) => void, getState: () => AppStateType) => {
            if (getState().stateTodo.offlineMode) {
                dispatch(
                    actions.createNewTodoAC(
                        {
                            id: v1(),
                            title: title,
                            addedDate: JSON.stringify(new Date()),
                            order: 0,
                            isASynchronizedTodo: true
                        }
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

    updateTodoList: (todolistId: string, title: string) => (dispatch: (action: ActionsType) => void, getState: () => AppStateType) => {
        if (getState().stateTodo.offlineMode) {
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

    deleteTodolist: (todolistId: string) => (dispatch: (action: ActionsType) => void, getState: () => AppStateType) => {
        if (getState().stateTodo.offlineMode) {
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

    addTaskTC: (todolistId: string, taskTitle: string) => (dispatch: (action: ActionsType) => void, getState: () => AppStateType) => {
        if (getState().stateTodo.offlineMode) {
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
                    addedDate: JSON.stringify(new Date()),
                    isASynchronizedTask: true
                })
            )
        } else {
            API.createNewTask(todolistId, taskTitle)

                .then((props) => {
                        console.log(props.createdTask)
                        if (props.resultCode === 0) {
                            dispatch(actions.addTaskAC(props.createdTask))
                        } else {
                            console.log(props.messages)
                        }
                    }
                ).catch((err) => console.log(err.message))
        }
    },

    updateTask: (task: TaskType) => (dispatch: (action: ActionsType) => void, getState: () => AppStateType) => {
        if (getState().stateTodo.offlineMode) {
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

    deleteTask: (todolistId: string, taskId: string) => (dispatch: (action: ActionsType) => void, getState: () => AppStateType) => {
        if (getState().stateTodo.offlineMode) {
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



