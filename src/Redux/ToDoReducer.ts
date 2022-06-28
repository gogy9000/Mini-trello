import {StateType, taskBodyType, TaskType, TodoTitleType} from "../Types";
import {API, TodoListItem} from "../DAL/TodoAPI";
import {AppDispatchType, AppThunk, InferActionsType} from "./ReduxStore";
import {v1} from "uuid";
import {actionsApp} from "./AppReducer";
import {handleClientsError, handlerNetworkError} from "../utils/HadleErrorUtils";


export enum EnumTodo {
    changeFilter = 'CHANGE-FILTER',
    removeTodo = 'REMOVE-TODO',
    updateTodoName = 'UPDATE-TODO-NAME',
    createNewTodo = 'CREATE-NEW-TODO',
    deleteTask = 'DELETE-TASK',
    addTask = 'ADD-TASK',
    updateTask = 'UPDATE-TASK',
    refreshTodolist = 'REFRESH-TODOLIST',
    refreshTask = 'REFRESH-TASKS',
    changeUnauthorizedMode = 'CHANGE-UNAUTHORIZED-MODE'
}

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


export type ActionsType = InferActionsType<typeof actions>

export let toDoReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case EnumTodo.changeFilter:
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


        case EnumTodo.removeTodo:
            delete state.taskBody[action.idTitle]
            return {
                ...state,
                tasksTitle: state.tasksTitle.filter((title: TodoTitleType) => title.id !== action.idTitle),
            }

        case EnumTodo.updateTodoName:

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

        case EnumTodo.createNewTodo:
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

        case EnumTodo.addTask:

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


        case EnumTodo.updateTask:

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

        case EnumTodo.deleteTask:
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

        case EnumTodo.refreshTodolist:

            return {
                ...state,
                tasksTitle: action.payload.reduce((acc, todo: TodoListItem) => {
                    return [...acc, {...todo, filter: "All"}]
                }, [] as TodoTitleType[]),

                taskBody: action.payload.reduce((acc, todo: TodoListItem) => {
                    return {...acc, [todo.id]: {activeTasks: [], completedTasks: []}}
                }, state.taskBody)
            }

        case EnumTodo.refreshTask:

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
        case EnumTodo.changeUnauthorizedMode:
            return {...state, offlineMode: action.offlineMode}


        default:
            return state

    }
}


export const actions = {
    changeFilterAC: (todoId: string, filter: string) => ({type: EnumTodo.changeFilter, todoId, filter} as const),
    removeTodoAC: (idTitle: string) => ({type: EnumTodo.removeTodo, idTitle} as const),
    updateTodoNameAC: (titleName: string, idTitle: string) =>
        ({type: EnumTodo.updateTodoName, idTitle, titleName} as const),
    createNewTodoAC: (payload: TodoListItem) => ({type: EnumTodo.createNewTodo, payload} as const),
    deleteTaskAC: (id: string, idTitle: string) => ({type: EnumTodo.deleteTask, id, idTitle} as const),
    addTaskAC: (item: TaskType) => ({type: EnumTodo.addTask, newTask: item} as const),
    updateTaskAC: (updatedTask: TaskType) => ({type: EnumTodo.updateTask, updatedTask} as const),
    refreshTodoListAC: (payload: TodoListItem[]) => ({type: EnumTodo.refreshTodolist, payload} as const),
    refreshTasks: (tasks: TaskType[]) => ({type: EnumTodo.refreshTask, tasks} as const),
    changeOfflineMode: (offlineMode: boolean) => ({
        type: EnumTodo.changeUnauthorizedMode,
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
    synchronizeTodo: (): AppThunk => (dispatch: AppDispatchType, getState) => {

        getState().toDoReducer.tasksTitle.forEach((todo) => {
                if (todo.isASynchronizedTodo) {

                    API.createTodoList(todo.title)
                        .then((props) => {
                                if (props.resultCode === 0) {
                                    dispatch(actions.createNewTodoAC(props.TodoListItem))

                                    let activeTasksPromise = new Promise((resolve, reject) => {
                                        if (getState().toDoReducer.taskBody[todo.id].activeTasks.length === 0) {
                                            reject('activeTasks-empty')
                                            return
                                        }

                                        getState().toDoReducer.taskBody[todo.id].activeTasks.forEach(
                                            (task, i, arr) => {

                                                if (task.isASynchronizedTask) {

                                                    API.createNewTask(props.TodoListItem.id, task.title)
                                                        .then((props) => {

                                                                if (props.resultCode === 0) {
                                                                    dispatch(actions.addTaskAC(props.createdTask))
                                                                } else {
                                                                    handleClientsError(dispatch, props.messages)
                                                                }

                                                                if (i === arr.length - 1) {
                                                                    resolve('success')
                                                                }
                                                            }
                                                        )
                                                        .catch((err) => {
                                                                dispatch(actionsApp.changeHandleNetworkError(err.message))
                                                            }
                                                        )
                                                }
                                            }
                                        )
                                    })

                                    let completedTasksPromise = new Promise((resolve, reject) => {

                                        if (getState().toDoReducer.taskBody[todo.id].completedTasks.length === 0) {
                                            reject('completedTasks-empty')
                                            return
                                        }
                                        getState().toDoReducer.taskBody[todo.id].completedTasks.forEach(
                                            (task, index, array) => {

                                                if (task.isASynchronizedTask) {

                                                    API.createNewTask(props.TodoListItem.id, task.title)
                                                        .then((props) => {
                                                                if (props.resultCode === 0) {
                                                                    dispatch(actions.addTaskAC(props.createdTask))
                                                                } else {
                                                                    handleClientsError(dispatch, props.messages)
                                                                }
                                                                return props.createdTask
                                                            }
                                                        )
                                                        .then((createdTask) => {
                                                                API.updateTask({...createdTask, status: 1})
                                                                    .then((props) => {
                                                                            if (props.resultCode === 0) {
                                                                                dispatch(actions.updateTaskAC(props.newTask))
                                                                            } else {
                                                                                handleClientsError(dispatch, props.messages)
                                                                            }
                                                                        }
                                                                    )
                                                                    .catch((err) => {
                                                                            dispatch(actionsApp.changeHandleNetworkError(err.message))
                                                                        }
                                                                    )

                                                                if (index === array.length - 1) {
                                                                    resolve('success')
                                                                }
                                                            }
                                                        )
                                                        .catch((err) => {
                                                                dispatch(actionsApp.changeHandleNetworkError(err.message))
                                                            }
                                                        )
                                                }
                                            }
                                        )
                                    })

                                    Promise.allSettled([activeTasksPromise, completedTasksPromise])
                                        .then(() => {
                                            dispatch(actions.removeTodoAC(todo.id))
                                        })

                                } else {
                                    handleClientsError(dispatch, props.messages)

                                }
                            }
                        )
                        .catch((err) => {
                            dispatch(actionsApp.changeHandleNetworkError(err.message))

                        })
                }

                if (!todo.isASynchronizedTodo) {

                    getState().toDoReducer.taskBody[todo.id].activeTasks.forEach((task) => {

                        if (task.isASynchronizedTask) {

                            API.createNewTask(todo.id, task.title)
                                .then((props) => {
                                        if (props.resultCode === 0) {

                                            dispatch(actions.addTaskAC(props.createdTask))
                                            dispatch(actions.deleteTaskAC(task.id, todo.id))

                                        } else {

                                            handleClientsError(dispatch, props.messages)

                                        }
                                    }
                                )
                                .catch((err) => dispatch(actionsApp.changeHandleNetworkError(err.message)))
                        }
                    })

                    getState().toDoReducer.taskBody[todo.id].completedTasks.forEach((task) => {

                        if (task.isASynchronizedTask) {

                            API.createNewTask(todo.id, task.title)
                                .then((props) => {

                                        if (props.resultCode === 0) {

                                            dispatch(actions.addTaskAC(props.createdTask))
                                            dispatch(actions.deleteTaskAC(task.id, todo.id))

                                        } else {

                                            handleClientsError(dispatch, props.messages)

                                        }
                                        return props.createdTask
                                    }
                                )
                                .then((createdTask) => {
                                        API.updateTask({...createdTask, status: 1})
                                            .then((props) => {
                                                    if (props.resultCode === 0) {

                                                        dispatch(actions.updateTaskAC(props.newTask))

                                                    } else {

                                                        handleClientsError(dispatch, props.messages)

                                                    }
                                                }
                                            ).catch((err) => dispatch(actionsApp.changeHandleNetworkError(err.message)))

                                    }
                                )
                                .catch((err) => dispatch(actionsApp.changeHandleNetworkError(err.message)))
                        }
                    })
                }
            }
        )
    },

    // getTodolistAndTasks: (): AppThunk => async (dispatch: AppDispatchType, getState) => {
    //     if (getState().toDoReducer.offlineMode) {
    //         return
    //     } else {
    //         try {
    //             dispatch(actionsApp.toggleIsWaitingApp(true))
    //             const response = await API.getTodoList()
    //
    //             if (response.status === 200) {
    //
    //
    //
    //                 response.data.forEach((todo) => {
    //                     dispatch(thunks.getTasks(todo.id))
    //
    //                 })
    //                 dispatch(actions.refreshTodoListAC(response.data))
    //             } else {
    //                 handleClientsError(dispatch, [response.statusText])
    //             }
    //         } catch (error) {
    //             handlerNetworkError(dispatch, error)
    //         } finally {
    //             dispatch(actionsApp.toggleIsWaitingApp(false))
    //         }
    //     }
    // },

    // getTodolist: (): AppThunk => async (dispatch: AppDispatchType) => {
    //     try {
    //         const response = await API.getTodoList()
    //         if (response.status === 200) {
    //             dispatch(actions.refreshTodoListAC(response.data))
    //
    //         } else {
    //             handleClientsError(dispatch, [response.statusText])
    //         }
    //
    //     } catch (error) {
    //         handlerNetworkError(dispatch, error)
    //     }
    //
    //
    // },

    // getTasks: (todolistId: string): AppThunk => async (dispatch: AppDispatchType) => {
    //
    //     try {
    //         dispatch(actionsApp.addWaitingList(todolistId))
    //         const props = await API.getTasks(todolistId)
    //         if (props.status === 200) {
    //             dispatch(actions.refreshTasks(props.tasks))
    //         } else {
    //             handleClientsError(dispatch, [props.statusText])
    //         }
    //     } catch (error) {
    //         handlerNetworkError(dispatch, error)
    //     } finally {
    //         dispatch(actionsApp.removeWaitingList(todolistId))
    //     }
    // },

    createTodolistTC: (title: string): AppThunk => async (dispatch: AppDispatchType, getState) => {
        if (getState().toDoReducer.offlineMode) {

            if (title.length > 100) {

                const error = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
                handleClientsError(dispatch, [error])

            } else {

                const newASynchronizedTodo = {
                    id: v1(),
                    title: title,
                    addedDate: JSON.stringify(new Date()),
                    order: 0,
                    isASynchronizedTodo: true
                }
                dispatch(actions.createNewTodoAC(newASynchronizedTodo))

            }

        } else {

            try {
                dispatch(actionsApp.toggleIsWaitingApp(true))
                let props = await API.createTodoList(title)
                if (props.resultCode === 0) {
                    dispatch(actions.createNewTodoAC(props.TodoListItem))
                } else {
                    handleClientsError(dispatch, props.messages)
                }
            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.toggleIsWaitingApp(false))
            }
        }
    },

    updateTodoList: (todolistId: string, title: string): AppThunk => async (dispatch: AppDispatchType, getState) => {

        if (getState().toDoReducer.offlineMode) {

            if (title.length > 100) {

                const error = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
                handleClientsError(dispatch, [error])

            } else {
                dispatch(actions.updateTodoNameAC(title, todolistId))
            }

        } else {
            try {
                dispatch(actionsApp.addWaitingList(todolistId))

                const response = await API.updateTodoLis(todolistId, title)

                if (response.data.resultCode === 0) {
                    dispatch(actions.updateTodoNameAC(title, todolistId))
                } else {
                    handleClientsError(dispatch, response.data.messages)
                }

            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.removeWaitingList(todolistId))
            }
        }
    },

    deleteTodolist: (todolistId: string): AppThunk => async (dispatch: AppDispatchType, getState) => {
        if (getState().toDoReducer.offlineMode) {
            dispatch(actions.removeTodoAC(todolistId))
        } else {
            try {
                dispatch(actionsApp.addWaitingList(todolistId))

                const response = await API.deleteTodoList(todolistId)
                if (response.data.resultCode === 0) {
                    dispatch(actions.removeTodoAC(todolistId))
                } else {
                    handleClientsError(dispatch, response.data.messages)
                }

            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.removeWaitingList(todolistId))
            }
        }

    },

    addTaskTC: (todolistId: string, taskTitle: string): AppThunk => async (dispatch: AppDispatchType, getState) => {
        if (getState().toDoReducer.offlineMode) {

            if (taskTitle.length > 100) {

                const error = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
                handleClientsError(dispatch, [error])

            } else {

                const newASynchronizedTask = {
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
                }

                dispatch(actions.addTaskAC(newASynchronizedTask))
            }

        } else {
            try {

                dispatch(actionsApp.addWaitingList(todolistId))
                const props = await API.createNewTask(todolistId, taskTitle)
                if (props.resultCode === 0) {
                    dispatch(actions.addTaskAC(props.createdTask))
                } else {
                    handleClientsError(dispatch, props.messages)
                }

            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.removeWaitingList(todolistId))
            }
        }
    },

    updateTask: (task: TaskType): AppThunk => async (dispatch: AppDispatchType, getState) => {
        if (getState().toDoReducer.offlineMode) {

            if (task.title.length > 100) {

                const error = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
                handleClientsError(dispatch, [error])

            } else {
                dispatch(actions.updateTaskAC(task))
            }

        } else {
            try {

                dispatch(actionsApp.addWaitingList(task.id))
                const props = await API.updateTask(task)
                if (props.resultCode === 0) {
                    dispatch(actions.updateTaskAC(props.newTask))
                } else {
                    handleClientsError(dispatch, props.messages)
                }

            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.removeWaitingList(task.id))
            }
        }
    },

    deleteTask: (todolistId: string, taskId: string): AppThunk => async (dispatch: AppDispatchType, getState) => {
        if (getState().toDoReducer.offlineMode) {
            dispatch(actions.deleteTaskAC(taskId, todolistId))
        } else {
            try {

                const resp = await API.deleteTask(todolistId, taskId)
                if (resp.data.resultCode === 0) {
                    dispatch(actions.deleteTaskAC(taskId, todolistId))
                } else {
                    handleClientsError(dispatch, resp.data.messages)
                }

            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.removeWaitingList(taskId))
            }
        }
    }
}




