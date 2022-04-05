export type Task1Type = {
    id: number
    title: string
    isDone: boolean
}



export type StateType={
    activeTasks: Array<Task1Type>
    completedTasks:Array<Task1Type>

    newTaskTitle: string | number | readonly string[] | undefined
}

export type TodoPropsType = {
    state: StateType
    dispatch: (action:any) => void
}


export type TaskBlockType = {
    tasks: Array<Task1Type>
    callBack:(id:number)=>void

}

export type InputPropsType = {
    state: StateType
    dispatch: (action:any) => void
    newTaskTitle: string | number | readonly string[] | undefined
}