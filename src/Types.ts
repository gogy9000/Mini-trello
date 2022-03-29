export type Task1Type = {
    id: number
    title: string
    isDone: boolean
}

export type Task2Type = {
    id: number
    title: string
    isDone: boolean
}

export type StateType={
    taskArr1: Array<Task1Type>
    taskArr2: Array<Task2Type>
}

export type TodoPropsType = {
    tasks: Array<Task1Type>|Array<Task2Type>
}

export type AppPropsType = {
    state: StateType

}
export type TaskBlockType = {
    tasks: Array<Task1Type> | Array<Task2Type>
}