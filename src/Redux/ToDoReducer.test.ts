// import {StateType, Task1Type} from "../Types";
//
// import {
//     addTaskAC, checkTaskAC,
//     createNewTodoAC, deleteTaskAC,
//     removeTodoAC,
//     taskBlockReducer,
//     updateTaskAC,
//     updateTodoNameAC
// } from "./ToDoReducer";
//
//
// let state: StateType
//
//
// beforeEach(() => {
//    let taskIdWhat='v1(12345)'
//         state = {
//             tasksTitle: [{ id:taskIdWhat,
//                 titleName:'strin'}],
//             taskBody: {
//                 [taskIdWhat]: {
//                     activeTasks: [{
//                         id: 'stringTest0123',
//                         title: 'new Task',
//                         isDone: false,
//                     }] as Array<Task1Type>,
//                     completedTasks: [{
//                         id: 'stringTest',
//                         title: 'new Task',
//                         isDone: true,
//                     }] as Array<Task1Type>
//                 },
//             }
//         }
//     }
// )
//
// test('Todo should be add', ()=>{
//     let action=createNewTodoAC('bla-bla')
//     let newState= taskBlockReducer(state,action)
//     expect(newState.tasksTitle.length).toBe(1)
// })
// test('Task should be added',()=>{
//
//     let action=addTaskAC('v1(12345)', 'inputText')
//     let newState= taskBlockReducer(state,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks.length).toBe(2)
// })
// test('task to be updated',()=>{
//     let action=updateTaskAC('v1(12345)', 'stringTest0123', 'task updated')
//     let newState= taskBlockReducer(state,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks[0].title).toBe('task updated')
// })
// test('to-do name should be updated',()=>{
//     let action=updateTodoNameAC('title updated', 'v1(12345)')
//     let newState= taskBlockReducer(state,action)
//     expect(newState.tasksTitle[0].titleName).toBe('title updated')
// })
// test('ToDo should be removed',()=>{
//     let action=removeTodoAC('v1(12345)')
//     let newState= taskBlockReducer(state,action)
//     expect(newState.taskBody['v1(12345)']).toBe(undefined)
//     expect(newState.tasksTitle.length).toBe(0)
// })
// test('task should be deleted',()=>{
//     let action=deleteTaskAC('stringTest0123', 'v1(12345)')
//     let newState= taskBlockReducer(state,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks.length).toBe(0)
//     expect(newState.taskBody['v1(12345)'].completedTasks.length).toBe(1)
// })
// test('task to be checked',()=>{
//     let action =checkTaskAC('stringTest0123', 'v1(12345)')
//     let newState= taskBlockReducer(state,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks.length).toBe(0)
//     expect(newState.taskBody['v1(12345)'].completedTasks.length).toBe(2)
//     expect(newState.taskBody['v1(12345)'].completedTasks[1].isDone).toBe(true)
// })
// test('task to be unchecked',()=>{
//     let action =checkTaskAC('stringTest', 'v1(12345)')
//     let newState= taskBlockReducer(state,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks.length).toBe(2)
//     expect(newState.taskBody['v1(12345)'].completedTasks.length).toBe(0)
//     expect(newState.taskBody['v1(12345)'].activeTasks[1].isDone).toBe(false)
// })
export const a ={}