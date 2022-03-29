export type Task1Type = {
    id: number
    title: string
    isDone: boolean
}



export type StateType={
    tasks: Array<Task1Type>

    newTaskTitle: string | number | readonly string[] | undefined
}

export type TodoPropsType = {
    state: StateType
    dispatch: (action:any) => void
}


export type TaskBlockType = {
    tasks: Array<Task1Type>
    dispatch: (action:any) => void
}

export type InputPropsType = {
    state: StateType
    dispatch: (action:any) => void
    newTaskTitle: string | number | readonly string[] | undefined
}