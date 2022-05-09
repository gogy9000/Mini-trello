
export type Task1Type = {
    id: string
    title: string
    isDone: boolean
}

export type taskTitle={
    id:string
    titleName:string
}

export type StateType={
    tasksTitle:Array<taskTitle>

    taskBody:{
        [id:string]:{
            activeTasks: Array<Task1Type>
            completedTasks:Array<Task1Type>
        }
    }
}



export type InputPropsType = {
    idTitle:string
    state: StateType
    dispatch: (action:any) => void

}