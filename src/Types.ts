

export type TaskType = {
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
    isASynchronizedTask?:boolean
}

export type TodoTitleType ={
    id:string
    title:string
    addedDate:string
    order:number
    filter: string
    isASynchronizedTodo?:boolean
}

export type InitialStateTodoType ={
    tasksTitle:Array<TodoTitleType>
    taskBody:taskBodyType
    offlineMode:boolean,
    waitingList:{ [id: string]: boolean }
    isFetching:boolean
    errors:string[]

}
export type taskBodyType={
    [x:string]:TaskType[]
}