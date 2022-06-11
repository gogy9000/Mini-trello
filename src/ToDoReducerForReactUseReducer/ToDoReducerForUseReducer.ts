// import {StateType, TaskType, TodoTitleType} from "../Types";
//
// import {v1} from 'uuid';
//
//
// export const initialState: StateType = {
//     tasksTitle: [] as Array<TodoTitleType>,
//
//     taskBody: {
//         // [taskIdWhat]: {
//         //     activeTasks: [] as Array<TaskType>,
//         //     completedTasks: [] as Array<TaskType>
//         // },
//         // [taskIdWho]: {
//         //     activeTasks: [] as Array<TaskType>,
//         //     completedTasks: [] as Array<TaskType>
//         // }
//     },
// }
//
// export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
// export type ActionsType = InferActionsType<typeof actions>
//
// export let ToDoReducer = (state: StateType = initialState, action: ActionsType): StateType => {
//
//     switch (action.type) {
//
//         case 'UPDATE-TASK':
//             return {
//                 ...state,
//                 taskBody: {
//                     ...state.taskBody,
//                     [action.todo]: {
//                         activeTasks:
//                             state.taskBody[action.todo].activeTasks.map(
//                                 (todo: TaskType) => todo.id === action.taskId
//                                     ? {id: todo.id, title: action.taskValue, isDone: todo.isDone}
//                                     : todo),
//                         completedTasks:
//                             state.taskBody[action.todo].completedTasks.map(
//                                 (todo: TaskType) => todo.id === action.taskId
//                                     ? {id: todo.id, title: action.taskValue, isDone: todo.isDone}
//                                     : todo)
//                     }
//                 }
//             }
//
//
//         case 'REMOVE-TODO':
//             delete state.taskBody[action.todo]
//             return {
//                 ...state,
//                 tasksTitle: state.tasksTitle.filter((title: TodoTitleType) => title.id != action.todo),
//             }
//
//         case 'UPDATE-TODO-NAME':
//
//             return {
//                 ...state,
//                 tasksTitle: [...state.tasksTitle.map((title: TodoTitleType) =>
//                     title.id !== action.todo ?
//                         title
//                         : {id: action.todo, titleName: action.titleName})
//                 ],
//                 taskBody: {...state.taskBody}
//             }
//
//         case 'CREATE-NEW-TODO':
//             let todo = action.toDoId
//             return {
//                 ...state,
//                 tasksTitle: [...state.tasksTitle, {id: todo, titleName: action.todoName}],
//                 taskBody: {
//                     ...state.taskBody,
//                     [todo]: {
//                         activeTasks: [],
//                         completedTasks: []
//                     }
//                 }
//             }
//
//         case 'ADD-TASK':
//
//             let newTask = {
//                 id: action.taskId,
//                 title: action.inputText.trim(),
//                 isDone: false
//             };
//
//             return {
//                 ...state,
//                 tasksTitle: state.tasksTitle,
//                 taskBody: {
//                     ...state.taskBody,
//                     [action.todo]: {
//                         activeTasks: [...state.taskBody[action.todo].activeTasks, newTask],
//                         completedTasks: [...state.taskBody[action.todo].completedTasks]
//                     }
//                 },
//                 //ты должен страдать от вложенности!!!
//             };
//
//
//         case 'CHECK-TASK':
//
//
//             let copyState: StateType = {
//                 ...state,
//                 tasksTitle: state.tasksTitle,
//                 // @ts-ignore
//                 taskBody: {
//                     ...state.taskBody,
//                     [action.todo]: {
//                         activeTasks: [
//                             ...state.taskBody[action.todo].activeTasks.map(todo =>
//
//                                 todo.id === action.id ?
//                                     todo.isDone ?
//                                         {todo, isDone: false} : {...todo, isDone: true} : todo)
//                         ],
//                         completedTasks: [
//                             ...state.taskBody[action.todo].completedTasks.map(todo =>
//
//                                 todo.id === action.id ?
//                                     todo.isDone ?
//                                         {...todo, isDone: false} : {...todo, isDone: true} : todo)
//                         ]
//                     }
//                 }
//                 ,
//             };
//
//             return {
//                 ...copyState,
//                 tasksTitle: copyState.tasksTitle,
//                 taskBody: {
//                     ...copyState.taskBody,
//                     [action.todo]: {
//                         activeTasks: [
//                             ...copyState.taskBody[action.todo].activeTasks.filter((el: TaskType) => !el.isDone),
//                             ...copyState.taskBody[action.todo].completedTasks.filter((el: TaskType) => !el.isDone)
//                         ],
//                         completedTasks: [
//                             ...copyState.taskBody[action.todo].completedTasks.filter((el: TaskType) => el.isDone),
//                             ...copyState.taskBody[action.todo].activeTasks.filter((el: TaskType) => el.isDone)
//                         ]
//                         //страдааай!!!
//                     }
//                 },
//             };
//
//         case 'DELETE-TASK':
//
//             return {
//                 ...state,
//                 taskBody: {
//                     ...state.taskBody,
//                     [action.todo]: {
//                         activeTasks: [...state.taskBody[action.todo].activeTasks.filter(todo =>
//                             todo.id !== action.id)],
//                         completedTasks: [...state.taskBody[action.todo].completedTasks.filter(todo =>
//                             todo.id !== action.id)]
//                     }
//                     //не так уж и страшно впринципе
//                 },
//             }
//
//         default:
//             return state
//
//     }
// }
//
// export const actions = {
//     updateTaskAC: (todo: string, taskId: string, taskValue: string) => ({
//         type: 'UPDATE-TASK',
//         todo,
//         taskId,
//         taskValue
//     } as const),
//     removeTodoAC: (todo: string) => ({type: 'REMOVE-TODO', todo} as const),
//     updateTodoNameAC: (titleName: string, todo: string) =>
//         ({type: 'UPDATE-TODO-NAME', todo, titleName} as const),
//     createNewTodoAC: (todoName: string) => ({type: 'CREATE-NEW-TODO', todoName, toDoId: v1()} as const),
//     deleteTaskAC: (id: string, todo: string) => ({type: 'DELETE-TASK', id, todo} as const),
//     addTaskAC: (todo: string, inputText: string) => ({
//         type: 'ADD-TASK',
//         todo,
//         inputText,
//         taskId:v1()
//     } as const),
//     updateTaskAC: (id: string, todo: string) => ({type: 'CHECK-TASK', id, todo} as const)
// }
//
//
//
export const q={}