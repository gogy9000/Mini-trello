import {StateType, TaskType, TodoTitleType} from "../../Types";
import {API,TodoListItem} from "../../DAL/TodoAPI";
import {AppDispatchType, AppThunk, InferActionsType} from "../ReduxStore";
import {v1} from "uuid";
import {actionsApp} from "../Application/AppReducer";
import {handleClientsError, handlerNetworkError} from "../../utils/HadleErrorUtils";
import {AxiosResponse} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: StateType =
    {
        tasksTitle: [] as Array<TodoTitleType>,
        taskBody: {


        },
        offlineMode: true
    }
const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        removeTodoAC: (state, action: PayloadAction<string>) => {
            state.tasksTitle = state.tasksTitle.filter(todo => todo.id !== action.payload)
            delete state.taskBody[action.payload]
        },
        updateTodoNameAC: (state, action: PayloadAction<{ title: string, id: string }>) => {
            state.tasksTitle.forEach(todo => {
                if (todo.id === action.payload.id) {
                    todo.title = action.payload.title
                }
            })
        },
        createNewTodoAC: (state, action: PayloadAction<TodoListItem>) => {
            state.tasksTitle = [...state.tasksTitle, {...action.payload, filter: 'All'}]
            state.taskBody[action.payload.id] = []
        },
        addTaskAC: (state, action: PayloadAction<TaskType>) => {
            state.taskBody[action.payload.todoListId].push(action.payload)
        },
        updateTaskAC: (state, action: PayloadAction<TaskType>) => {
            state.taskBody[action.payload.todoListId] = state.taskBody[action.payload.todoListId]
                .map(task => task.id === action.payload.id ? action.payload : task)
        },
        deleteTaskAC: (state, action: PayloadAction<{ taskId: string, todoId: string }>) => {
            state.taskBody[action.payload.todoId] = state.taskBody[action.payload.todoId]
                .filter(task => task.id !== action.payload.taskId)
        },
        refreshTodoListAC: (state, action: PayloadAction<TodoListItem[]>) => {

            state.tasksTitle = action.payload.reduce((acc, todo: TodoListItem) => {
                return [...acc, {...todo, filter: "All"}]
            }, [] as TodoTitleType[])

            state.taskBody = action.payload.reduce((acc, todo: TodoListItem) => {
                return {...acc, [todo.id]: []}
            }, state.taskBody)
        },
        refreshTasks: (state, action: PayloadAction<TaskType[]>) => {

            state.taskBody = action.payload.reduce((taskBody, newTask) => {
                return {...taskBody, [newTask.todoListId]: [
                    ...taskBody[newTask.todoListId].filter((oldTask)=> oldTask.id!==newTask.id), newTask
                    ]
                }
            }, state.taskBody as { [key: string]: TaskType[] })

        },
        changeUnauthorizedMode: (state, action: PayloadAction<boolean>) => {
            state.offlineMode = action.payload
        },
        changeFilterAC: (state, action: PayloadAction<{ todoId: string, newFilter: string }>) => {
            state.tasksTitle.forEach(todo => {
                if (todo.id === action.payload.todoId) {
                    todo.filter = action.payload.newFilter
                }
            })
        }
    }
})

export type ActionsType = InferActionsType<typeof actions>

export let toDoReducer = todoSlice.reducer

export const actions = todoSlice.actions

export const thunks = {

    synchronizeTodoAll: (): AppThunk => (dispatch: AppDispatchType, getState) => {

        getState().toDoReducer.tasksTitle.forEach((todo) => {
                dispatch(thunks.synchronizeTodo(todo))

            }
        )
    },

    synchronizeTodo: (todo: TodoListItem): AppThunk => async (dispatch: AppDispatchType, getState) => {
        if (todo.isASynchronizedTodo) {
            try {
                dispatch(actionsApp.addWaitingList(todo.id))
                const props = await API.createTodoList(todo.title)

                if (props.resultCode === 0) {
                    dispatch(actions.createNewTodoAC(props.TodoListItem))

                    let activeTasksPromise = new Promise((resolve, reject) => {

                        if (getState().toDoReducer.taskBody[todo.id].length === 0) {
                            reject('activeTasks-empty')
                            return
                        }
                        getState().toDoReducer.taskBody[todo.id].forEach(
                            async (task, i, arr) => {

                                if (task.isASynchronizedTask) {
                                      dispatch(thunks.synchronizeTask(props.TodoListItem.id, task))

                                }
                                if (i === arr.length - 1) {
                                    resolve('success')
                                }
                            }
                        )
                    })

                    Promise.allSettled([activeTasksPromise])
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

    synchronizeTasks: (todo: TodoListItem): AppThunk => async (dispatch: AppDispatchType, getState) => {

        if (!todo.isASynchronizedTodo) {
            for (const task of getState().toDoReducer.taskBody[todo.id]) {
                if (task.isASynchronizedTask) {
                      await  dispatch(thunks.synchronizeTask(todo.id, task))

                }
            }
        }
    },

    synchronizeTask: (todoId: string, task: TaskType): AppThunk => {

      return   async (dispatch: AppDispatchType) => {

            try {
                dispatch(actionsApp.addWaitingList(todoId))
                const props = await API.createNewTask(todoId, task.title)
                if (props.resultCode === 0) {
                    dispatch(actions.addTaskAC(props.createdTask))
                    if(task.status!==0){
                        dispatch(thunks.updateTask({...props.createdTask, status: task.status}))
                    }
                    dispatch(actions.deleteTaskAC({taskId: task.id, todoId}))
                } else {
                    handleClientsError(dispatch, props.messages)
                }
                return props.resultCode
            } catch (error) {
              handlerNetworkError(dispatch, error)
                console.log(error)

            } finally {
                dispatch(actionsApp.removeWaitingList(todoId))
            }
        }
    },


    getTodolistAndTasks: (): AppThunk<Promise<AxiosResponse<TodoListItem[]> | undefined>> => async (dispatch: AppDispatchType, getState) => {
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
                return response
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

    createTodolistTC: (title: string): AppThunk => async (dispatch: AppDispatchType, getState) => {

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
            if (!getState().toDoReducer.offlineMode) {
                dispatch(thunks.synchronizeTodo(newASynchronizedTodo))
            }

        }
    },

    updateTodoList: (todo: TodoListItem): AppThunk => async (dispatch: AppDispatchType) => {
        const {title, id, isASynchronizedTodo} = todo
        if (isASynchronizedTodo) {

            if (title.length > 100) {

                const error = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
                handleClientsError(dispatch, [error])

            } else {
                dispatch(actions.updateTodoNameAC({title, id}))
            }

        } else {
            try {
                dispatch(actionsApp.addWaitingList(id))

                const response = await API.updateTodoLis(id, title)

                if (response.data.resultCode === 0) {
                    dispatch(actions.updateTodoNameAC({title, id}))
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

    deleteTodolist: (todo: TodoListItem): AppThunk => async (dispatch: AppDispatchType) => {
        const {id, isASynchronizedTodo} = todo
        if (isASynchronizedTodo) {
            dispatch(actions.removeTodoAC(todo.id))
        } else {
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
                console.log(error)
            } finally {
                dispatch(actionsApp.removeWaitingList(task.id))
            }
        }
    },

    deleteTask: (todolistId: string, task: TaskType): AppThunk => async (dispatch: AppDispatchType) => {
        if (task.isASynchronizedTask) {
            dispatch(actions.deleteTaskAC({taskId: task.id, todoId: todolistId}))
        } else {
            try {
                dispatch(actionsApp.addWaitingList(task.id))
                const resp = await API.deleteTask(todolistId, task.id)
                if (resp.data.resultCode === 0) {
                    dispatch(actions.deleteTaskAC({taskId: task.id, todoId: todolistId}))
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




