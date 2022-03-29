
import {StateType} from "../Types";

const initialState: StateType = {
    tasks: [
        {id: 0, title: 'HTML&CSS', isDone: false},
        {id: 1, title: 'JS', isDone: false},
        {id: 2, title: 'ReactJS', isDone: false},
        {id: 3, title: 'RestAPI', isDone: false},
        {id: 4, title: 'GraphQL', isDone: false},
    ],

    newTaskTitle: '' as string | number | readonly string[] | undefined

}

export let taskBlockReducer = (state: StateType = initialState, action: any) => {
    switch (action.type) {

        case 'ADD-TASK':
            let newTask = {
                id: Math.round(state.tasks.length * Math.random() * 1000000),
                title: state.newTaskTitle,
                isDone:false
            }
            return {...state, tasks:[...state.tasks,newTask],newTaskTitle:''}


        case 'CHANGE-TEXT-TASK-TITLE':
            return {...state, newTaskTitle: action.text}

        case 'CHECK-TASK':
            return {...state,
            tasks: state.tasks.map(task=> task.id===action.id?
                !task.isDone?
                    {...task, isDone:true}:{...task, isDone:false}:task)}

        default: return state

    }

}

type  addTaskACType={ type: typeof ADD_TASK }
const ADD_TASK= 'ADD-TASK'
export const addTaskAC = ():addTaskACType =>({type:ADD_TASK})

type ChangeTextTaskTitleACType={ type: typeof CHANGE_TEXT_TASK_TITLE, text: string }
const   CHANGE_TEXT_TASK_TITLE= 'CHANGE-TEXT-TASK-TITLE'
export const ChangeTextTaskTitleAC = (text:string):ChangeTextTaskTitleACType =>({type: CHANGE_TEXT_TASK_TITLE, text})

type checkTaskACType={type: typeof CHECK_TASK, id: number }
const CHECK_TASK= 'CHECK-TASK'
export const checkTaskAC=(id:number):checkTaskACType=>({type:CHECK_TASK,id})