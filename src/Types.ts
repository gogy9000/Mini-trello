import {ActionsType} from './Redux/ToDoReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoTitleType ={
    id:string
    title:string
    addedDate:string
    order:number
    filter: string
}

export type StateType={
    tasksTitle:Array<TodoTitleType>
    taskBody:taskBodyType

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