import {ActionsType} from './Redux/ToDoReducer';

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

export type StateType={
    tasksTitle:Array<TodoTitleType>
    taskBody:taskBodyType
    unauthorizedMode:boolean

}



export type InputPropsType = {
    idTitle:string
    state: StateType
    dispatch: (action:ActionsType) => void

}
export type taskBodyType={
    [x:string]:{
        activeTasks: Array<TaskType>
        completedTasks:Array<TaskType>
    }
}