import axios, {AxiosResponse} from "axios";
import {TaskType} from "../Types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {"API-KEY": "c73c3d73-c86d-4ccb-b780-4d18cdc9edd5"}
})

type Data<T = any> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export type TodoListItem = {
    "id": string,
    "title": string
    "addedDate": string
    "order": number
}

type CreateTodoListType = {
    item: TodoListItem
}

export type TaskApi = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: any
    deadline: any
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const API = {
    getTodoList: () => instance.get(`todo-lists`)
        .then((response: AxiosResponse<TodoListItem[]>) => response.data),

    getTasks: (todolistId: string) => instance.get(`todo-lists/${todolistId}/tasks`)
        .then((res: AxiosResponse) => res.data.items),


    createTodoList: (title: string = 'new todo') => instance.post(`todo-lists`, {title: title})
        .then((response: AxiosResponse<Data<CreateTodoListType>>) => response.data.data.item),

    updateTodoLis:(todolistId:string,title:string)=>instance.put(`todo-lists/${todolistId}`,{title:title}),

    deleteTodoList:(todolistId:string)=>instance.delete(`todo-lists/${todolistId}`),


    createNewTask: (todolistId: string, taskTitle: string) =>
        instance.post(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
            .then((res: AxiosResponse) => res.data.data.item),

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
        )
            .then((res) => res.data.data.item)
    },

    deleteTask:(todolistId:string, taskId:string)=>instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)

}