import {InitialStateTodoType, TaskType, TodoTitleType} from "../../Types";
import {API, Data, TaskItem, TodoListItem} from "../../DAL/TodoAPI";
import {AppRootStateType} from "../ReduxStore";
import {v1} from "uuid";
import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";


enum todo {
    todo = 'todo',
    deleteTask = 'todo/deleteTask',
    getTodolistAndTasks = "todo/getTodolistAndTasks",
    getTasks = "todo/getTasks",
    updateTask = "todo/updateTask",
    addTask = "todo/addTask",
    deleteTodolist = "todo/deleteTodolist",
    createTodolist = "todo/createTodolist",
    updateTodoList = "todo/updateTodoList",
    synchronizeTodo = "todo/synchronizeTodo",
    synchronizeTask = "todo/synchronizeTask",
    synchronizeTasks = "todo/synchronizeTasks",
    synchronizeTodos = "todo/synchronizeTodos"
}

export const thunks = {
    synchronizeTodos: createAsyncThunk(todo.synchronizeTodos, (param, {dispatch, getState}) => {

        const state = getState() as AppRootStateType
        state.toDoReducer.tasksTitle.forEach((todo) => {
                dispatch(thunks.synchronizeTodo(todo))
            }
        )
    }),

    synchronizeTodo: createAsyncThunk<void,TodoListItem,{rejectValue: string[]}>
    (todo.synchronizeTodo, async (todo: TodoListItem, {dispatch, getState,rejectWithValue}) => {

        const state = getState() as AppRootStateType
        if (todo.isASynchronizedTodo) {
            const response = await API.createTodoList(todo.title)
                if (response.data.resultCode === 0) {
                    dispatch(actions.createNewTodoAC(response.data.data.item))
                    let promise = new Promise((resolve, reject) => {
                        if (state.toDoReducer.taskBody[todo._id].length === 0) {
                            reject('activeTasks-empty')
                        }
                        state.toDoReducer.taskBody[todo._id].forEach(
                            (task, i, arr) => {
                                if (task.isASynchronizedTask) {
                                    dispatch(thunks.synchronizeTask(
                                            {
                                                task: {...task, todoListId: response.data.data.item._id},
                                                todo: response.data.data.item
                                            }
                                        )
                                    )

                                }
                                if (i === arr.length - 1) {
                                    resolve('success')
                                }
                            }
                        )
                    })
                    Promise.allSettled([promise])
                        .then(() => {
                            dispatch(thunks.deleteTodolist(todo))
                        })
                }
            return rejectWithValue(response.data.messages)
        }
        dispatch(thunks.synchronizeTasks(todo))
    }),

    synchronizeTasks: createAsyncThunk<void,TodoListItem>
    (todo.synchronizeTasks, async (todo: TodoListItem, {dispatch, getState}) => {
        const state = getState() as AppRootStateType
        if (!todo.isASynchronizedTodo) {
            for (const task of state.toDoReducer.taskBody[todo._id]) {
                if (task.isASynchronizedTask) {
                    dispatch(thunks.synchronizeTask(
                        {task: {...task, todoListId: todo._id}, todo}))
                }
            }
        }
    }),

    synchronizeTask: createAsyncThunk<void,{ task: TaskType, todo: TodoListItem }>
    (todo.synchronizeTask, async (params: { task: TaskType, todo: TodoListItem }, {dispatch}) => {
        const {task, todo} = params
        const addedTask = await dispatch(thunks.addTask({todo, taskTitle: task.title}))
        if (thunks.addTask.fulfilled.match(addedTask)) {
            if (task.status !== 0) {
                dispatch(thunks.updateTask({...addedTask.payload, status: task.status}))
                dispatch(thunks.deleteTask(task))
            }

        }
    }),

    getTodolistAndTasks: createAsyncThunk<TodoListItem[],void,{rejectValue: string[]}>
    (todo.getTodolistAndTasks, async (param, {dispatch,rejectWithValue, getState}) => {
        let state = getState() as AppRootStateType
        if (!state.toDoReducer.offlineMode) {
                const response = await API.getTodoList()
                if (response.status === 200) {
                    response.data.forEach((todo) => {
                        dispatch(thunks.getTasks(todo._id))
                    })
                   return  response.data

                } else {
                 return  rejectWithValue([response.statusText])
                }
        }
        return rejectWithValue([])
    }),

    getTasks: createAsyncThunk<TaskItem[],string,{rejectValue: string[]}>
    (todo.getTasks, async (todolistId:string, {rejectWithValue}) => {
        const response = await API.getTasks(todolistId)
        console.log(response)
        if (response.status === 200) {
            return response.data.items
        }else {
            return rejectWithValue([response.data.error||response.statusText])
        }
    }),

    createTodolist: createAsyncThunk<TodoListItem,string,{rejectValue: string[]}>
    (todo.createTodolist, async (title: string, {getState,rejectWithValue}) => {
        if (title.length > 100) {
            return  rejectWithValue(["Maximum length of 100"])
        }
        const state = getState() as AppRootStateType
        if (state.toDoReducer.offlineMode) {
            return {
                _id: v1(),
                title: title,
                addedDate: JSON.stringify(new Date()),
                order: 0,
                isASynchronizedTodo: true
            }
        }else {
            const response = await API.createTodoList(title)
            if(response.data.resultCode===0){
                return response.data.data.item
            }else {
                return rejectWithValue(response.data.messages)
            }
        }
    }),

    updateTodoList: createAsyncThunk<TodoListItem,TodoListItem,{rejectValue: string[]}>
    (todo.updateTodoList, async (todo: TodoListItem, {rejectWithValue}) => {
        const {title, _id, isASynchronizedTodo} = todo
        if (isASynchronizedTodo) {
            if (title.length > 100) {
              return rejectWithValue(["Maximum length of '100'. (Title)"])
            } else {
              return todo
            }
        } else {
            const response = await API.updateTodoList(_id, title)
                if (response.data.resultCode === 0) {
                 return todo
                }else {
                   return  rejectWithValue(response.data.messages)
                }
        }
    }),

    deleteTodolist: createAsyncThunk<string,TodoListItem,{ rejectValue: string[]}>
    (todo.deleteTodolist, async (todo: TodoListItem, {rejectWithValue}) => {
        const {_id, isASynchronizedTodo} = todo
        if (isASynchronizedTodo) {
            return  _id
        } else {
            const response = await API.deleteTodoList(_id)
                if (response.data.resultCode === 0) {
                    return  _id
                }else {
                    return rejectWithValue(response.data.messages)
                }
        }
    }),

    addTask: createAsyncThunk<TaskType, { todo: TodoListItem, taskTitle: string }, { rejectValue: string[] }>
    (todo.addTask, async (param: { todo: TodoListItem, taskTitle: string }, {dispatch,rejectWithValue}) => {
        const {todo, taskTitle} = param
        const newASynchronizedTask: TaskType = {
            description: null,
            title: taskTitle,
            status: 0,
            priority: 0,
            startDate: null,
            deadline: null,
            _id: v1(),
            todoListId: todo._id,
            order: 0,
            addedDate: JSON.stringify(new Date()),
            isASynchronizedTask: true,

        }
        dispatch(actions.addIdInWaitingList({id:todo._id}))
        if (todo.isASynchronizedTodo) {
            dispatch(actions.removeIdInWaitingList({id:todo._id}))
            if (taskTitle.length > 100) {
                const error = "Maximum length of '100'. (Title)"
                return rejectWithValue([error])
            } else {

                return newASynchronizedTask
            }

        } else {
            const response = await API.createNewTask(todo._id, taskTitle)
            dispatch(actions.removeIdInWaitingList({id:todo._id}))
            if (response.data.resultCode === 0) {
                return response.data.data.item
            } else {
                return rejectWithValue(response.data.messages)
            }

        }


    }),

    updateTask: createAsyncThunk<TaskType, TaskType, { rejectValue: string[] }>
    (todo.updateTask, async (task: TaskType, {rejectWithValue}) => {
        if (task.isASynchronizedTask) {
            if (task.title.length > 100) {
                return rejectWithValue(["max length 100 symbols"])
            } else {
                return task
            }
        } else {
            const response = await API.updateTask(task)
            console.log(response)
            if (response.data.resultCode === 0) {
                return response.data.data.item
            } else {
                return rejectWithValue(response.data.messages)
            }
        }
    }),

    deleteTask: createAsyncThunk<{ response: Data, task: TaskType }, TaskType, {}>
    (todo.deleteTask, async (task: TaskType) => {
            if (task.isASynchronizedTask) {
                return {response: {data: {}, fieldsErrors: [""], messages: [""], resultCode: 0}, task}
            } else {
                const promise = await API.deleteTask(task.todoListId, task._id)
                return {response: promise.data, task}
            }
        }
    )
}


export const initialState: InitialStateTodoType =
    {
        tasksTitle: [],
        taskBody: {},
        offlineMode: true,
        waitingList: {},
        isFetching:false,
        errors: []
    }

const todoSlice = createSlice({
    name: todo.todo,
    initialState: initialState,
    reducers: {
        createNewTodoAC: (state, action: PayloadAction<TodoListItem>) => {
            state.tasksTitle = [...state.tasksTitle, {...action.payload, filter: 'All'}]
            state.taskBody[action.payload._id] = []
        },
        changeUnauthorizedMode: (state, action: PayloadAction<boolean>) => {
            state.offlineMode = action.payload
        },
        changeFilterAC: (state, action: PayloadAction<{ todoId: string, newFilter: string }>) => {
            state.tasksTitle.forEach(todo => {
                if (todo._id === action.payload.todoId) {
                    todo.filter = action.payload.newFilter
                }
            })
        },
        clearErrors: (state, action) => {
            state.errors = action.payload
        },

         addIdInWaitingList: (state: InitialStateTodoType,action: PayloadAction<{id: string}> ) => {
             Object.assign(state.waitingList, {[action.payload.id]: true})
        },
         removeIdInWaitingList : (state: InitialStateTodoType,action: PayloadAction<{id: string}> ) => {
            delete state.waitingList[action.payload.id]
        }
    },
    extraReducers: builder => {

        const addIdInWaitingList = (state: InitialStateTodoType, id: string) => {
            return Object.assign(state.waitingList, {[id]: true})
        }
        const removeIdInWaitingList = (state: InitialStateTodoType, id: string) => {
            return delete state.waitingList[id]
        }
        const networkErrorsInterceptor = (state: InitialStateTodoType, errors?: string) => {
            return errors ? state.errors.push(errors) : state
        }
        const clientsErrorsInterceptor = (state: InitialStateTodoType, errors: string[]) => {

            return state.errors.push(...errors)
        }
        const unionErrorsInterceptor = (state: InitialStateTodoType, action: PayloadAction<string[] | undefined, any, any, SerializedError>) => {
            if (!!action.payload) {
                return clientsErrorsInterceptor(state, action.payload)
            } else {
                return networkErrorsInterceptor(state, action.error.message)
            }
        }

        builder
            //delete task
            .addCase(thunks.deleteTask.pending, (state, action) => {
                addIdInWaitingList(state, action.meta.arg._id)
            })
            .addCase(thunks.deleteTask.fulfilled, (state, action) => {
                if (action.payload.response.resultCode === 0) {
                    state.taskBody[action.payload.task.todoListId] = state.taskBody[action.payload.task.todoListId]
                        .filter(task => task._id !== action.payload.task._id)
                } else {
                    clientsErrorsInterceptor(state, action.payload.response.messages)
                }
                removeIdInWaitingList(state, action.meta.arg._id)
            })
            .addCase(thunks.deleteTask.rejected, (state, action) => {
                networkErrorsInterceptor(state, action.error.message)
                removeIdInWaitingList(state, action.meta.arg._id)
            })
            //update task
            .addCase(thunks.updateTask.pending, (state, action) => {
                addIdInWaitingList(state, action.meta.arg._id)
            })
            .addCase(thunks.updateTask.fulfilled, (state, action) => {
                state.taskBody[action.payload.todoListId] = state.taskBody[action.payload.todoListId]
                    .map(task => task._id === action.payload._id ? action.payload : task)
                removeIdInWaitingList(state, action.meta.arg._id)
            })
            .addCase(thunks.updateTask.rejected, (state, action) => {
                unionErrorsInterceptor(state, action)
                removeIdInWaitingList(state, action.meta.arg._id)
            })
            //add task
            .addCase(thunks.addTask.pending, (state, action) => {
            })
            .addCase(thunks.addTask.fulfilled, (state, action) => {
                state.taskBody[action.payload.todoListId].push(action.payload)
            })
            .addCase(thunks.addTask.rejected, (state, action) => {
                unionErrorsInterceptor(state, action)
            })
            //delete todoList
            .addCase(thunks.deleteTodolist.pending, (state, action) => {
                addIdInWaitingList(state, action.meta.arg._id)
            })
            .addCase(thunks.deleteTodolist.fulfilled, (state, action) => {
                state.tasksTitle = state.tasksTitle.filter(todo => todo._id !== action.payload)
                delete state.taskBody[action.payload]
                removeIdInWaitingList(state, action.meta.arg._id)
            })
            .addCase(thunks.deleteTodolist.rejected, (state, action) => {
                unionErrorsInterceptor(state, action)
                removeIdInWaitingList(state, action.meta.arg._id)
            })
            //update todoList
            .addCase(thunks.updateTodoList.pending, (state, action) => {
                addIdInWaitingList(state, action.meta.arg._id)
            })
            .addCase(thunks.updateTodoList.fulfilled, (state, action) => {
                state.tasksTitle.forEach(todo => {
                    if (todo._id === action.payload._id) {
                        todo.title = action.payload.title
                    }
                })
                removeIdInWaitingList(state, action.meta.arg._id)
            })
            .addCase(thunks.updateTodoList.rejected, (state, action) => {
                unionErrorsInterceptor(state, action)
                removeIdInWaitingList(state, action.meta.arg._id)
            })
        //create todoList
            .addCase(thunks.createTodolist.pending, (state, action) => {
                state.isFetching=true
            })
            .addCase(thunks.createTodolist.fulfilled, (state, action) => {
                state.tasksTitle = [...state.tasksTitle, {...action.payload, filter: 'All'}]
                state.taskBody[action.payload._id] = []
                state.isFetching=false
            })
            .addCase(thunks.createTodolist.rejected, (state, action) => {
               state.isFetching=false
                unionErrorsInterceptor(state, action)
            })
            //get tasks
            .addCase(thunks.getTasks.pending,(state,action)=>{
                addIdInWaitingList(state,action.meta.arg)
            })
            .addCase(thunks.getTasks.fulfilled,(state,action)=>{
                state.taskBody = action.payload.reduce((taskBody, newTask) => {

                    return {
                        ...taskBody, [newTask.todoListId]: [
                            ...taskBody[newTask.todoListId].filter((oldTask) => oldTask._id !== newTask._id), newTask
                        ]
                    }
                }, state.taskBody as { [key: string]: TaskType[] })
                removeIdInWaitingList(state,action.meta.arg)
            })
            .addCase(thunks.getTasks.rejected,(state,action)=>{
                removeIdInWaitingList(state,action.meta.arg)
                unionErrorsInterceptor(state, action)
            })
            .addCase(thunks.getTodolistAndTasks.pending,(state,action)=>{
                state.isFetching=true
            })
            //get todolist
            .addCase(thunks.getTodolistAndTasks.fulfilled,(state,action)=>{
                state.tasksTitle = action.payload.reduce((acc, todo: TodoListItem) => {
                    return [...acc, {...todo, filter: "All"}]
                }, [] as TodoTitleType[])

                state.taskBody = action.payload.reduce((acc, todo: TodoListItem) => {
                    return {...acc, [todo._id]: []}
                }, state.taskBody)
                state.isFetching=false
            })
            .addCase(thunks.getTodolistAndTasks.rejected,(state,action)=>{
                state.isFetching=false
                unionErrorsInterceptor(state, action)
            })
            //synchronize todo
            .addCase(thunks.synchronizeTodo.pending,(state,action)=>{
                addIdInWaitingList(state,action.meta.arg._id)
            })
            .addCase(thunks.synchronizeTodo.fulfilled,(state,action)=>{
                removeIdInWaitingList(state,action.meta.arg._id)
            })
            .addCase(thunks.synchronizeTodo.rejected,(state,action)=>{
                removeIdInWaitingList(state,action.meta.arg._id)
                unionErrorsInterceptor(state, action)
            })
            //synchronizeTask
            .addCase(thunks.synchronizeTask.pending,(state,action)=>{
                addIdInWaitingList(state,action.meta.arg.task._id)
            })
            .addCase(thunks.synchronizeTask.fulfilled,(state,action)=>{
                removeIdInWaitingList(state,action.meta.arg.task._id)
            })
            .addCase(thunks.synchronizeTask.rejected,(state,action)=>{
                removeIdInWaitingList(state,action.meta.arg.task._id)
            })

            .addCase(thunks.synchronizeTasks.pending,(state,action)=>{
                addIdInWaitingList(state,action.meta.arg._id)
            })
            .addCase(thunks.synchronizeTasks.fulfilled,(state,action)=>{
                removeIdInWaitingList(state,action.meta.arg._id)
            })
            .addCase(thunks.synchronizeTasks.rejected,(state,action)=>{
                removeIdInWaitingList(state,action.meta.arg._id)
            })

    }
})

export let toDoReducer = todoSlice.reducer
export const actions = todoSlice.actions






