import {ActionsType} from './Redux/ToDoReducer';

export type Task1Type = {
    id: string
    title: string
    isDone: boolean
}

export type TaskTitleType ={
    id:string
    titleName:string
}

export type StateType={
    tasksTitle:Array<TaskTitleType>

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