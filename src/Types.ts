import {deleteTaskAC} from "./Redux/TaskBlokReducer";

export type Task1Type = {
    id: string
    title: string
    isDone: boolean
}



export type StateType={
    activeTasks: Array<Task1Type>
    completedTasks:Array<Task1Type>

    newTaskTitle: string
    taskFilterMode: string
    errorInput:boolean
}

export type TaskBlockType = {
    tasks: Array<Task1Type>
    callBack: (id: string)=>void
    dispatch:(action:any)=>void

}

export type InputPropsType = {
    state: StateType
    dispatch: (action:any) => void
    newTaskTitle: string | number | readonly string[] | undefined
}