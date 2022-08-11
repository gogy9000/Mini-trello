import axios, {AxiosResponse} from "axios";
import {TaskType} from "../Types";
import {limitRPS} from "../utils/LimitRPS";
import axiosRateLimit from "axios-rate-limit";




export type Data<T = any> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type Item<D=any>={
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
export type LoginPayloadType={
    email:string
    password:string
    rememberMe?:boolean
    captcha?:boolean
}
export type AuthDataType = {
    email: string
    id: string
    login: string
}

const instance = axiosRateLimit( axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {"API-KEY": "1fb0efe7-1c1f-46ce-bb74-74ed02f7875f"}
}),{maxRequests:2,perMilliseconds:1000,maxRPS:2})



export const ApiAuth={
    authMe:()=>instance.get(`auth/me`).then((res:AxiosResponse<Data<AuthDataType>>)=>res),
    login:(loginPayload:LoginPayloadType)=>instance.post(`/auth/login`,loginPayload)
        .then((res:AxiosResponse<Data<{userId:string}>>)=>res),
    logout:()=>instance.delete(`/auth/login`).then((res:AxiosResponse<Data<{}>>)=>res)
}

export const API = {
    getTodoList: () => instance.get(`todo-lists`).then((response:AxiosResponse<TodoListItem[]>)=> response),

    getTasks: (todolistId: string, count: number = 100, page: number = 1) => {
        return instance.get(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
            .then((response: AxiosResponse<GetTaskType>) => {
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
        .then((response: AxiosResponse<Data<Item<TodoListItem>>>) => {
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
            .then((response: AxiosResponse<Data<Item<TaskItem>>>) => {
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
        ).then((response:AxiosResponse<Data<Item<TaskItem>>>) => {
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