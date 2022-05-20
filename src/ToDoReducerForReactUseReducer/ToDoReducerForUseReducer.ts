// import {StateType, Task1Type, TaskTitleType} from "../Types";
//
// import {v1} from 'uuid';
//
//
// export const initialState: StateType = {
//     tasksTitle: [] as Array<TaskTitleType>,
//
//     taskBody: {
//         // [taskIdWhat]: {
//         //     activeTasks: [] as Array<Task1Type>,
//         //     completedTasks: [] as Array<Task1Type>
//         // },
//         // [taskIdWho]: {
//         //     activeTasks: [] as Array<Task1Type>,
//         //     completedTasks: [] as Array<Task1Type>
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
//                     [action.todoId]: {
//                         activeTasks:
//                             state.taskBody[action.todoId].activeTasks.map(
//                                 (todo: Task1Type) => todo.id === action.taskId
//                                     ? {id: todo.id, title: action.taskValue, isDone: todo.isDone}
//                                     : todo),
//                         completedTasks:
//                             state.taskBody[action.todoId].completedTasks.map(
//                                 (todo: Task1Type) => todo.id === action.taskId
//                                     ? {id: todo.id, title: action.taskValue, isDone: todo.isDone}
//                                     : todo)
//                     }
//                 }
//             }
//
//
//         case 'REMOVE-TODO':
//             delete state.taskBody[action.todoId]
//             return {
//                 ...state,
//                 tasksTitle: state.tasksTitle.filter((title: TaskTitleType) => title.id != action.todoId),
//             }
//
//         case 'UPDATE-TODO-NAME':
//
//             return {
//                 ...state,
//                 tasksTitle: [...state.tasksTitle.map((title: TaskTitleType) =>
//                     title.id !== action.todoId ?
//                         title
//                         : {id: action.todoId, titleName: action.titleName})
//                 ],
//                 taskBody: {...state.taskBody}
//             }
//
//         case 'CREATE-NEW-TODO':
//             let todoId = action.toDoId
//             return {
//                 ...state,
//                 tasksTitle: [...state.tasksTitle, {id: todoId, titleName: action.todoName}],
//                 taskBody: {
//                     ...state.taskBody,
//                     [todoId]: {
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
//                     [action.todoId]: {
//                         activeTasks: [...state.taskBody[action.todoId].activeTasks, newTask],
//                         completedTasks: [...state.taskBody[action.todoId].completedTasks]
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
//                     [action.todoId]: {
//                         activeTasks: [
//                             ...state.taskBody[action.todoId].activeTasks.map(todo =>
//
//                                 todo.id === action.id ?
//                                     todo.isDone ?
//                                         {todo, isDone: false} : {...todo, isDone: true} : todo)
//                         ],
//                         completedTasks: [
//                             ...state.taskBody[action.todoId].completedTasks.map(todo =>
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
//                     [action.todoId]: {
//                         activeTasks: [
//                             ...copyState.taskBody[action.todoId].activeTasks.filter((el: Task1Type) => !el.isDone),
//                             ...copyState.taskBody[action.todoId].completedTasks.filter((el: Task1Type) => !el.isDone)
//                         ],
//                         completedTasks: [
//                             ...copyState.taskBody[action.todoId].completedTasks.filter((el: Task1Type) => el.isDone),
//                             ...copyState.taskBody[action.todoId].activeTasks.filter((el: Task1Type) => el.isDone)
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
//                     [action.todoId]: {
//                         activeTasks: [...state.taskBody[action.todoId].activeTasks.filter(todo =>
//                             todo.id !== action.id)],
//                         completedTasks: [...state.taskBody[action.todoId].completedTasks.filter(todo =>
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
//     updateTaskAC: (todoId: string, taskId: string, taskValue: string) => ({
//         type: 'UPDATE-TASK',
//         todoId,
//         taskId,
//         taskValue
//     } as const),
//     removeTodoAC: (todoId: string) => ({type: 'REMOVE-TODO', todoId} as const),
//     updateTodoNameAC: (titleName: string, todoId: string) =>
//         ({type: 'UPDATE-TODO-NAME', todoId, titleName} as const),
//     createNewTodoAC: (todoName: string) => ({type: 'CREATE-NEW-TODO', todoName, toDoId: v1()} as const),
//     deleteTaskAC: (id: string, todoId: string) => ({type: 'DELETE-TASK', id, todoId} as const),
//     addTaskAC: (todoId: string, inputText: string) => ({
//         type: 'ADD-TASK',
//         todoId,
//         inputText,
//         taskId:v1()
//     } as const),
//     checkTaskAC: (id: string, todoId: string) => ({type: 'CHECK-TASK', id, todoId} as const)
// }
//
//
//
export const q={}