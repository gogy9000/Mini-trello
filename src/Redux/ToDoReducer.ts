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
        offlineMode: true
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

    synchronizeTodoAll: (): AppThunk =>  (dispatch: AppDispatchType, getState) => {

        getState().toDoReducer.tasksTitle.forEach((todo) => {
                dispatch(thunks.synchronizeTodo(todo))

            }
        )
    },

    synchronizeTodo:(todo:TodoListItem):AppThunk=>async (dispatch: AppDispatchType, getState)=>{
        if (todo.isASynchronizedTodo) {
            try {
                dispatch(actionsApp.addWaitingList(todo.id))
                const props = await API.createTodoList(todo.title)

                if (props.resultCode === 0) {
                    dispatch(actions.createNewTodoAC(props.TodoListItem))

                    let activeTasksPromise = new Promise((resolve, reject) => {

                        if (getState().toDoReducer.taskBody[todo.id].activeTasks.length === 0) {
                            reject('activeTasks-empty')
                            return
                        }
                        getState().toDoReducer.taskBody[todo.id].activeTasks.forEach(
                          async  (task, i, arr) => {

                                if (task.isASynchronizedTask) {
                                    dispatch(thunks.synchronizeTask(props.TodoListItem.id,task))

                                }
                                if (i === arr.length - 1) {
                                    resolve('success')
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
                            async (task, index, array) => {

                                if (task.isASynchronizedTask) {
                                    dispatch(thunks.synchronizeTask(props.TodoListItem.id,task))
                                }
                                if (index === array.length - 1) {
                                    resolve('success')
                                }
                            }
                        )
                    })

                    Promise.allSettled([activeTasksPromise, completedTasksPromise])
                        .then(() => {
                            dispatch(actions.removeTodoAC(todo.id))
                            dispatch(actionsApp.removeWaitingList(todo.id))
                        })

                } else {
                    handleClientsError(dispatch, props.messages)

                }
            } catch (error) {
                handlerNetworkError(dispatch, error)
                dispatch(actionsApp.removeWaitingList(todo.id))
            }
        }

        dispatch(thunks.synchronizeTasks(todo))

    },

    synchronizeTasks:(todo:TodoListItem):AppThunk=>async (dispatch: AppDispatchType, getState)=>{
        if (!todo.isASynchronizedTodo) {
            for (const task of getState().toDoReducer.taskBody[todo.id].activeTasks) {
                if (task.isASynchronizedTask) {
                    dispatch(thunks.synchronizeTask(todo.id,task))
                }
            }

            for (const task of getState().toDoReducer.taskBody[todo.id].completedTasks) {
                if (task.isASynchronizedTask) {
                    dispatch(thunks.synchronizeTask(todo.id,task))

                }
            }
        }

    },

    synchronizeTask:(todoId:string, task:TaskType): AppThunk => async (dispatch: AppDispatchType) =>{

        try {
            dispatch(actionsApp.addWaitingList(todoId))
            const props = await API.createNewTask(todoId, task.title)
            if (props.resultCode === 0) {
                dispatch(actions.addTaskAC(props.createdTask))
                dispatch(thunks.updateTask({...props.createdTask, status: task.status}))
                dispatch(actions.deleteTaskAC(task.id, todoId))
            } else {
                handleClientsError(dispatch, props.messages)
            }

        } catch (error) {
            handlerNetworkError(dispatch, error)
        } finally {
            dispatch(actionsApp.removeWaitingList(todoId))
        }
    },



    getTodolistAndTasks: (): AppThunk => async (dispatch: AppDispatchType, getState) => {
        if (getState().toDoReducer.offlineMode) {
            return
        } else {
            try {
                dispatch(actionsApp.toggleIsWaitingApp(true))
                const response = await API.getTodoList()

                if (response.status === 200) {
                    dispatch(actions.refreshTodoListAC(response.data))
                    response.data.forEach((todo) => {
                        dispatch(thunks.getTasks(todo.id))
                    })

                } else {
                    handleClientsError(dispatch, [response.statusText])
                }
            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.toggleIsWaitingApp(false))
            }
        }
    },


    getTasks: (todolistId: string): AppThunk => async (dispatch: AppDispatchType) => {

        try {
            dispatch(actionsApp.addWaitingList(todolistId))
            const props = await API.getTasks(todolistId)
            if (props.status === 200) {
                dispatch(actions.refreshTasks(props.tasks))
            } else {
                handleClientsError(dispatch, [props.statusText])
            }
        } catch (error) {
            handlerNetworkError(dispatch, error)
        } finally {
            dispatch(actionsApp.removeWaitingList(todolistId))
        }
    },

    createTodolistTC: (title: string): AppThunk => async (dispatch: AppDispatchType,getState) => {

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
                if(!getState().toDoReducer.offlineMode){
                  dispatch(thunks.synchronizeTodo(newASynchronizedTodo))
                }

            }
    },

    updateTodoList: (todo:TodoListItem): AppThunk => async (dispatch: AppDispatchType) => {
        const {title,id,isASynchronizedTodo}=todo
        if (isASynchronizedTodo) {

            if (title.length > 100) {

                const error = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
                handleClientsError(dispatch, [error])

            } else {
                dispatch(actions.updateTodoNameAC(title, id))
            }

        } else {
            try {
                dispatch(actionsApp.addWaitingList(id))

                const response = await API.updateTodoLis(id, title)

                if (response.data.resultCode === 0) {
                    dispatch(actions.updateTodoNameAC(title, id))
                } else {
                    handleClientsError(dispatch, response.data.messages)
                }

            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.removeWaitingList(id))
            }
        }
    },

    deleteTodolist: (todo:TodoListItem): AppThunk => async (dispatch: AppDispatchType) => {
        const {id,isASynchronizedTodo}=todo
            if(isASynchronizedTodo){
                dispatch(actions.removeTodoAC(todo.id))
            }else {
                try {
                    dispatch(actionsApp.addWaitingList(id))

                    const response = await API.deleteTodoList(id)
                    if (response.data.resultCode === 0) {
                        dispatch(actions.removeTodoAC(id))
                    } else {
                        handleClientsError(dispatch, response.data.messages)
                    }

                } catch (error) {
                    handlerNetworkError(dispatch, error)
                } finally {
                    dispatch(actionsApp.removeWaitingList(id))
                }
            }


    },

    addTaskTC: (todo: TodoListItem, taskTitle: string): AppThunk => async (dispatch: AppDispatchType) => {

        const newASynchronizedTask = {
            description: null,
            title: taskTitle,
            status: 0,
            priority: 0,
            startDate: null,
            deadline: null,
            id: v1(),
            todoListId: todo.id,
            order: 0,
            addedDate: JSON.stringify(new Date()),
            isASynchronizedTask: true,

        }

        if (todo.isASynchronizedTodo) {

            if (taskTitle.length > 100) {

                const error = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
                handleClientsError(dispatch, [error])

            } else {



                dispatch(actions.addTaskAC(newASynchronizedTask))
            }

        } else {
            try {

                dispatch(actionsApp.addWaitingList(todo.id))
                const props = await API.createNewTask(todo.id, taskTitle)
                if (props.resultCode === 0) {

                    dispatch(actions.addTaskAC(props.createdTask))

                } else {
                    handleClientsError(dispatch, props.messages)
                }

            } catch (error) {
                handlerNetworkError(dispatch, error)
                dispatch(actions.addTaskAC(newASynchronizedTask))
            } finally {
                dispatch(actionsApp.removeWaitingList(todo.id))
            }
        }
    },

    updateTask: (task: TaskType): AppThunk => async (dispatch: AppDispatchType) => {
        if (task.isASynchronizedTask) {

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

    deleteTask: (todolistId: string, task:TaskType): AppThunk => async (dispatch: AppDispatchType, getState) => {
        if (task.isASynchronizedTask) {
            dispatch(actions.deleteTaskAC(task.id, todolistId))
        } else {
            try {

                const resp = await API.deleteTask(todolistId, task.id)
                if (resp.data.resultCode === 0) {
                    dispatch(actions.deleteTaskAC(task.id, todolistId))
                } else {
                    handleClientsError(dispatch, resp.data.messages)
                }

            } catch (error) {
                handlerNetworkError(dispatch, error)
            } finally {
                dispatch(actionsApp.removeWaitingList(task.id))
            }
        }
    }
}




