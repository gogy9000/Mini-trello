import {StateType, taskBodyType, TaskType, TodoTitleType} from "../Types";
import {TaskApi, APITodo, TodoListItem} from "../DAL/TodoAPI";

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
                tasksTitle: state.tasksTitle.filter((title: TodoTitleType) => title.id != action.idTitle),
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
                        activeTasks: [
                            ...state.taskBody[action.updatedTask.todoListId].activeTasks.map(task =>
                                task.id === action.updatedTask.id ? action.updatedTask : task)
                        ],
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
                                .filter((el: TaskType) => el.status===0),
                            ...copyState.taskBody[action.updatedTask.todoListId].completedTasks
                                .filter((el: TaskType) => el.status===0)
                        ],
                        completedTasks: [
                            ...copyState.taskBody[action.updatedTask.todoListId].completedTasks
                                .filter((el: TaskType) => el.status===1),
                            ...copyState.taskBody[action.updatedTask.todoListId].activeTasks
                                .filter((el: TaskType) => el.status===1)
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
                taskBody: action.tasks.reduce((acc:taskBodyType, tasksItem: TaskType) => {

                    if (tasksItem.status===0) {
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


        default:
            return state

    }
}

export const actions = {
    changeFilterAC: (todoId: string, filter: string) => ({type: 'CHANGE-FILTER', todoId, filter} as const),
    // updateTaskAC: (idTitle: string, taskId: string, taskValue: string) => ({
    //     type: 'UPDATE-TASK',
    //     idTitle,
    //     taskId,
    //     taskValue
    // } as const),
    removeTodoAC: (idTitle: string) => ({type: 'REMOVE-TODO', idTitle} as const),
    updateTodoNameAC: (titleName: string, idTitle: string) =>
        ({type: 'UPDATE-TODO-NAME', idTitle, titleName} as const),
    createNewTodoAC: (payload: TodoListItem) => ({type: 'CREATE-NEW-TODO', payload} as const),
    deleteTaskAC: (id: string, idTitle: string) => ({type: 'DELETE-TASK', id, idTitle} as const),
    addTaskAC: (item: any) => ({
        type: 'ADD-TASK',
        newTask: item
    } as const),
    updateTaskAC: ( updatedTask:TaskType) => ({type: 'UPDATE-TASK',updatedTask} as const),
    refreshTodoListAC: (payload: TodoListItem[]) => ({type: 'REFRESH-TODOLIST', payload} as const),
    refreshTasks: (tasks: TaskType[]) => ({type: 'REFRESH-TASKS', tasks} as const)
}


export const thunks = {
    addTaskTC: (todolistId: string, taskTitle: string) => (dispatch: (action: ActionsType) => void) => {
        APITodo.createNewTask(todolistId, taskTitle)
            .then((item) => {
                console.log(item)
                dispatch(actions.addTaskAC(item))
            })
    },
    getTodolistTC: () => (dispatch: (action: ActionsType) => void) => {
        APITodo.getTodoList()
            .then((data:TodoListItem[]) => {
                dispatch(actions.refreshTodoListAC(data))

                data.forEach((dataItem) => {
                    APITodo.getTasks(dataItem.id)
                        .then((tasks: TaskType[]) => {
                            console.log(tasks)
                            dispatch(actions.refreshTasks(tasks))
                        })
                })

            })

    },
    createTodolistTC: (title: string) => (dispatch: (action: ActionsType) => void) => {
        APITodo.createTodoList(title)
            .then((data) => {
                dispatch(actions.createNewTodoAC(data))
            })
    },
    updateTask: (task:TaskType) => (dispatch: (action: ActionsType)=>void) => {
        APITodo.updateTask(task).then(
            (newTask) => {
                console.log(newTask)
                dispatch(actions.updateTaskAC(newTask))
            })
    }

}



