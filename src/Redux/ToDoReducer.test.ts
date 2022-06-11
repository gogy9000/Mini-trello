// import {StateType, TaskType} from "../Types";
//
// import {actions, ToDoReducer} from "./ToDoReducer";
//
//
// let stateToDo: StateType
//
//
// beforeEach(() => {
//         let todoId='v1(12345)'
//         stateToDo = {
//             tasksTitle: [
//                 { id:todoId,
//                 title:'string'}],
//             taskBody: {
//                 [todoId]: {
//                     activeTasks: [{
//                         id: 'stringTest0123',
//                         title: 'new Task',
//                         isDone: false,
//                     }] as Array<TaskType>,
//                     completedTasks: [{
//                         id: 'stringTest',
//                         title: 'new Task',
//                         isDone: true,
//                     }] as Array<TaskType>
//                 },
//             }
//         }
//     }
// )
// test('filter should be changed',()=>{
//
//     let action = actions.changeFilterAC('v1(12345)','active')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.tasksTitle[0].filter).toBe('active')
// })
//
// test('Todo should be add', ()=>{
//     let action=actions.createNewTodoAC('bla-bla')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.tasksTitle.length).toBe(2)
// })
// test('Task should be added',()=>{
//
//     let action=actions.addTaskAC('v1(12345)', 'inputText')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks.length).toBe(2)
// })
// test('todo to be updated',()=>{
//     let action=actions.updateTaskAC('v1(12345)', 'stringTest0123', 'todo updated')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks[0].title).toBe('todo updated')
// })
// test('to-do name should be updated',()=>{
//     let action=actions.updateTodoNameAC('title updated', 'v1(12345)')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.tasksTitle[0].titleName).toBe('title updated')
// })
// test('ToDo should be removed',()=>{
//     let action=actions.removeTodoAC('v1(12345)')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.taskBody['v1(12345)']).toBe(undefined)
//     expect(newState.tasksTitle.length).toBe(0)
// })
// test('todo should be deleted',()=>{
//     let action=actions.deleteTaskAC('stringTest0123', 'v1(12345)')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks.length).toBe(0)
//     expect(newState.taskBody['v1(12345)'].completedTasks.length).toBe(1)
// })
// test('todo to be checked',()=>{
//     let action =actions.updateTaskAC('stringTest0123', 'v1(12345)')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks.length).toBe(0)
//     expect(newState.taskBody['v1(12345)'].completedTasks.length).toBe(2)
//     expect(newState.taskBody['v1(12345)'].completedTasks[1].isDone).toBe(true)
// })
// test('todo to be unchecked',()=>{
//     let action =actions.updateTaskAC('stringTest', 'v1(12345)')
//     let newState= ToDoReducer(stateToDo,action)
//     expect(newState.taskBody['v1(12345)'].activeTasks.length).toBe(2)
//     expect(newState.taskBody['v1(12345)'].completedTasks.length).toBe(0)
//     expect(newState.taskBody['v1(12345)'].activeTasks[1].isDone).toBe(false)
// })
export const a={}
