import {ActionsType} from './Redux/ToDoReducer';

export type Task1Type = {
    id: string
    title: string
    isDone: boolean
}

export type TodoTitleType ={
    id:string
    titleName:string
    filter:string
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
        activeTasks: Array<Task1Type>
        completedTasks:Array<Task1Type>
    }
}