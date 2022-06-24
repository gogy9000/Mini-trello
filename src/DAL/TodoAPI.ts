import axios, {AxiosResponse} from "axios";
import {TaskType} from "../Types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://cors-anywhere.herokuapp.com/https://social-network.samuraijs.com/api/1.1/',
    headers: {"API-KEY": "c73c3d73-c86d-4ccb-b780-4d18cdc9edd5"}
})

type Data<T = any> = {
    data:  Item<T>
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type Item<D=any>={
    item:D
}

export type TodoListItem = {
    "id": string,
    "title": string
    "addedDate": string
    "order": number
    isASynchronizedTodo?:boolean
}

type GetTaskType = {
    error:string|null
    items: TaskItem[]
    totalCount:number
}

export type TaskItem = {
    description: string|null
    title: string
    status: number
    priority: number
    startDate: string|null
    deadline: string|null
    id: string
    todoListId: string
    order: number
    addedDate: string
    isASynchronizedTask:boolean
}

export const API = {
    getTodoList: () => instance.get(`todo-lists`).then((response:AxiosResponse<TodoListItem[]>)=> response),

    getTasks: (todolistId: string, count: number = 100, page: number = 1) => {
        return instance.get(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
            .then((response: AxiosResponse<GetTaskType>) => {
                console.log(response)
                    return {
                        tasks: response.data.items,
                        totalCount: response.data.totalCount,
                        status: response.status,
                        statusText: response.statusText
                    }
                }
            )
    },


    createTodoList: (title: string = 'new todo') => instance.post(`todo-lists`, {title: title})
        .then((response: AxiosResponse<Data<TodoListItem>>) => {
                return {
                    TodoListItem: response.data.data.item,
                    resultCode: response.data.resultCode,
                    messages: response.data.messages
                }
            }
        ),

    updateTodoLis: (todolistId: string, title: string) => {
        return instance.put(`todo-lists/${todolistId}`, {title: title})
            .then((response:AxiosResponse<Data<{}>>)=>{
            return response
        })
    },

    deleteTodoList: (todolistId: string) => instance.delete(`todo-lists/${todolistId}`)
        .then((response:AxiosResponse<Data<{}>>)=>{
            return response
        }),



    createNewTask: (todolistId: string, taskTitle: string) =>
        instance.post(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
            .then((response: AxiosResponse<Data<TaskItem>>) => {
                    return {
                        createdTask: response.data.data.item,
                        resultCode: response.data.resultCode,
                        messages: response.data.messages
                    }
                }
            ),

    updateTask: (task: TaskType) => {
        return instance.put(`todo-lists/${task.todoListId}/tasks/${task.id}`,
            {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }
        ).then((response:AxiosResponse<Data<TaskItem>>) => {
                    return {
                        newTask: response.data.data.item,
                        resultCode: response.data.resultCode,
                        messages: response.data.messages
                    }
                }
            )
    },

    deleteTask: (todolistId: string, taskId: string) => instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
        .then((response:AxiosResponse<Data<{}>>)=>{
            return response
        })

}