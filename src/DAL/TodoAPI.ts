import axios, {AxiosResponse} from "axios";


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
    item: {
        "id": string
        "title": string
        "addedDate": string
        "order": number
    }
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

export const todoListAPI = {
    getTodoList: () => instance.get(`todo-lists`)
        .then((response: AxiosResponse<TodoListItem[]>) => response.data),

    createTodoList: (title: string = 'new todo') => instance.post(`todo-lists`, {title: title})
        .then((response: AxiosResponse<Data<CreateTodoListType>>) => response.data.data.item),

    getTasks: (todolistId: string) => instance.get(`todo-lists/${todolistId}/tasks`)
        .then((res: AxiosResponse) => {
            console.log(res)
            return res.data.items
        }),

    createNewTask: (todolistId: string, taskTitle: string) =>
        instance.post(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
            .then((res: AxiosResponse) => res.data.data.item),

    updateTask: (title: string, description: string,
                 completed: boolean, status: number,
                 priority: number, startDate: string,
                 deadline: string, todolistId: string, taskId: string) => {

        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {
                title: title,
                description: description,
                completed: completed,
                status: status,
                priority: priority,
                startDate: startDate,
                deadline: deadline
            }
        )
    }

}