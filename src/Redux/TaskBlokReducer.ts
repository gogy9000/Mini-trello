import {StateType, Task1Type} from "../Types";

// @ts-ignore
import {v1} from 'uuid'

const initialState: StateType = {
    activeTasks: [
        // {id: 1, title: 'фывыфв', isDone: false},
    ] as Array<Task1Type>,
    completedTasks: [] as Array<Task1Type>,

    newTaskTitle: '',

    taskFilterMode: 'All',

    errorInput: false
}

export let taskBlockReducer = (state: StateType = initialState, action: any) => {
    switch (action.type) {

        case 'SET-TASK-FILTER-MODE':
            return {...state, taskFilterMode: action.filterMod};

        case 'ADD-TASK':

            if ((/^\s+$/).test(state.newTaskTitle) || state.newTaskTitle === '') {
                return {...state, newTaskTitle: '', errorInput: true}
            }

            let trimText = state.newTaskTitle.trim()

            let newTask = {
                id: v1(),
                title: trimText,
                isDone: false
            };

            return {
                ...state,
                activeTasks: [...state.activeTasks, newTask],
                newTaskTitle: '',
                taskFilterMode: state.taskFilterMode
            };


        case 'CHANGE-TEXT-TASK-TITLE':

            return {...state, newTaskTitle: action.text};

        case 'CHECK-TASK':

            let copyState = {
                activeTasks: [
                    ...state.activeTasks.map(task =>

                        task.id === action.id ?
                            task.isDone ?
                                {task, isDone: false} : {...task, isDone: true} : task)
                ],
                completedTasks: [
                    ...state.completedTasks.map(task =>

                        task.id === action.id ?
                            task.isDone ?
                                {...task, isDone: false} : {...task, isDone: true} : task)
                ],
            };
            return {
                ...copyState,
                activeTasks: [
                    ...copyState.activeTasks.filter(el =>
                        !el.isDone), ...copyState.completedTasks.filter(el => !el.isDone)
                ],
                completedTasks: [
                    ...copyState.completedTasks.filter(el =>
                        el.isDone), ...copyState.activeTasks.filter(el => el.isDone)
                ],
                newTaskTitle: '',
                taskFilterMode: state.taskFilterMode
            };

        case 'ERROR-INPUT-RESET':
            return {...state, errorInput: false}
        case 'DELETE-TASK':
            debugger
            return {
                ...state,
                activeTasks: state.activeTasks.filter(task => task.id !== action.id),
                completedTasks: state.completedTasks.filter(task => task.id !== action.id),
                newTaskTitle: state.newTaskTitle,
                taskFilterMode: state.taskFilterMode,
                errorInput: state.errorInput
            }


        //
        // case 'GET-ACTIVE-TASKS':
        //
        //     return {
        //         ...state,
        //         activeTasks: [...action.activeFilter], newTaskTitle: '', taskFilterMode: state.taskFilterMode
        //     };
        //
        // case 'GET-COMPLETED-TASKS':
        //     return {
        //         ...state,
        //         completedTasks: [...action.completedFilter], newTaskTitle: '', taskFilterMode: state.taskFilterMode
        //     };
        //
        //
        // case 'GET-ALL-STATE':
        //     return {...state};

        default:
            return state

    }
}
type deleteTaskACType = { type: typeof DELETE_TASK, id: string }
const DELETE_TASK = 'DELETE-TASK'
export const deleteTaskAC = (id: string): deleteTaskACType => ({type: DELETE_TASK, id})

type errorInputResetACType = { type: typeof ERROR_INPUT_RESET }
const ERROR_INPUT_RESET = 'ERROR-INPUT-RESET'
export const errorInputResetAC = (): errorInputResetACType => ({type: ERROR_INPUT_RESET})

type  addTaskACType = { type: typeof ADD_TASK }
const ADD_TASK = 'ADD-TASK'
export const addTaskAC = (): addTaskACType => ({type: ADD_TASK})

type ChangeTextTaskTitleACType = { type: typeof CHANGE_TEXT_TASK_TITLE, text: string }
const CHANGE_TEXT_TASK_TITLE = 'CHANGE-TEXT-TASK-TITLE'
export const ChangeTextTaskTitleAC = (text: string): ChangeTextTaskTitleACType => ({type: CHANGE_TEXT_TASK_TITLE, text})

export type checkTaskACType = { type: typeof CHECK_TASK, id: string }
const CHECK_TASK = 'CHECK-TASK'
export const checkTaskAC = (id: string): checkTaskACType => ({type: CHECK_TASK, id})

export type setTaskFilterModeACType = { type: typeof SET_TASK_FILTER_MODE, filterMod: string }
const SET_TASK_FILTER_MODE = 'SET-TASK-FILTER-MODE'
export const setTaskFilterModeAC = (filterMod: string): setTaskFilterModeACType => ({
    type: SET_TASK_FILTER_MODE,
    filterMod
})
//
// type getActiveTasksACType = { type: typeof GET_ACTIVE_TASKS, activeFilter: Task1Type }
// const GET_ACTIVE_TASKS = 'GET-ACTIVE-TASKS'
// export const getActiveTasksAC = (activeFilter: Task1Type): getActiveTasksACType => ({
//     type: GET_ACTIVE_TASKS,
//     activeFilter
// })
//
// type getCompletedTasksACType = { type: typeof GET_COMPLETED_TASKS, completedFilter: Task1Type }
// const GET_COMPLETED_TASKS = 'GET-COMPLETED-TASKS'
// export const getCompletedTasksAC = (completedFilter: Task1Type): getCompletedTasksACType => ({
//     type: GET_COMPLETED_TASKS,
//     completedFilter
// })
//
// type getAllTasksACType = { type: typeof GET_ALL_STATE, state: Task1Type }
// const GET_ALL_STATE = 'GET-ALL-STATE'
// export const getAllTasksAC = (state: Task1Type): getAllTasksACType => ({type: GET_ALL_STATE, state})
//

