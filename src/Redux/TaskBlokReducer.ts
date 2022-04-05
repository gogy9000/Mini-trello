import {StateType, Task1Type} from "../Types";


const initialState: StateType = {
    activeTasks: [
        {id: 1, title: 'фывыфв', isDone: false},
        {id: 21, title: 'HTML&фывыф', isDone: false},
        {id: 31, title: 'пап&CSS', isDone: false},
        {id: 51, title: 'онгш&CSS', isDone: false},
        {id: 61, title: 'HTML&олдрд', isDone: false},
        {id: 71, title: 'рпо&CSS', isDone: false},
    ],
    completedTasks: [] as Array<Task1Type>,

    newTaskTitle: ''

}

export let taskBlockReducer = (state: StateType = initialState, action: any) => {
    switch (action.type) {

        case 'ADD-TASK':
            let newTask = {
                id: Math.round(state.activeTasks.length * Math.random() * 1000000),
                title: state.newTaskTitle,
                isDone: false
            }
            return {
                ...state,
                activeTasks: [...state.activeTasks, newTask],
                newTaskTitle:''


            }


        case 'CHANGE-TEXT-TASK-TITLE':
            return {...state, newTaskTitle: action.text}

        case 'CHECK-TASK':

            let copyState = {
                activeTasks:[
                ...state.activeTasks.map(task =>

                    task.id === action.id ?
                        task.isDone ?
                            {task, isDone: false} : {...task, isDone: true}:task)
            ],
                completedTasks:[
                    ...state.completedTasks.map(task =>

                        task.id === action.id ?
                            task.isDone ?
                                {...task, isDone: false} : {...task, isDone: true} : task)
                ],
            }

            return {
                ...copyState,
                activeTasks: [
                    ...copyState.activeTasks.filter(el =>
                        !el.isDone),...copyState.completedTasks.filter(el => !el.isDone)
                ],
                completedTasks: [
                    ...copyState.completedTasks.filter(el =>
                        el.isDone),...copyState.activeTasks.filter(el => el.isDone)
                ],
                newTaskTitle: ''
            }


        case 'GET-ACTIVE-TASKS':

            return {
                ...state,
                activeTasks: [...action.activeFilter], newTaskTitle: ''
            }

        case 'GET-COMPLETED-TASKS':
            return {
                ...state,
                completedTasks: [...action.completedFilter], newTaskTitle: ''
            }


        case 'GET-ALL-STATE':
            return {...state}

        default:
            return state

    }

}

type  addTaskACType = { type: typeof ADD_TASK }
const ADD_TASK = 'ADD-TASK'
export const addTaskAC = (): addTaskACType => ({type: ADD_TASK})

type ChangeTextTaskTitleACType = { type: typeof CHANGE_TEXT_TASK_TITLE, text: string }
const CHANGE_TEXT_TASK_TITLE = 'CHANGE-TEXT-TASK-TITLE'
export const ChangeTextTaskTitleAC = (text: string): ChangeTextTaskTitleACType => ({type: CHANGE_TEXT_TASK_TITLE, text})

export type checkTaskACType = { type: typeof CHECK_TASK, id: number }
const CHECK_TASK = 'CHECK-TASK'
export const checkTaskAC = (id: number): checkTaskACType => ({type: CHECK_TASK, id})

type getActiveTasksACType = { type: typeof GET_ACTIVE_TASKS, activeFilter: Task1Type }
const GET_ACTIVE_TASKS = 'GET-ACTIVE-TASKS'
export const getActiveTasksAC = (activeFilter: Task1Type): getActiveTasksACType => ({
    type: GET_ACTIVE_TASKS,
    activeFilter
})

type getCompletedTasksACType = { type: typeof GET_COMPLETED_TASKS, completedFilter: Task1Type }
const GET_COMPLETED_TASKS = 'GET-COMPLETED-TASKS'
export const getCompletedTasksAC = (completedFilter: Task1Type): getCompletedTasksACType => ({
    type: GET_COMPLETED_TASKS,
    completedFilter
})

type getAllTasksACType = { type: typeof GET_ALL_STATE, state: Task1Type }
const GET_ALL_STATE = 'GET-ALL-STATE'
export const getAllTasksAC = (state: Task1Type): getAllTasksACType => ({type: GET_ALL_STATE, state})