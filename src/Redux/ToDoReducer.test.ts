import {StateType, TaskType} from "../Types";

import {actions, ToDoReducer} from "./ToDoReducer";


let stateToDo: StateType
let todoId: string
let taskId1: string
let taskId2: string
let newTask: TaskType
beforeEach(() => {
        todoId = "b072220d-fb22-419f-9e90-27fb715cf285"
        taskId1 = "729d6408-9bcb-4f03-8b51-547c2fae376f"
        taskId2 = "13df920d-7a38-42b2-a5b9-ca2bc9fa333e"
        newTask = {
            id: "8ab714ca-d983-499b-b74e-22dd4e578d37",
            title: "adasdasd",
            description: null,
            todoListId: "b072220d-fb22-419f-9e90-27fb715cf285",
            order: -3,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: "2022-06-13T06:40:01.513",
        }
        stateToDo = {
            tasksTitle: [
                {
                    id: todoId,
                    addedDate: "123",
                    order: 1,
                    filter: 'All',
                    title: 'string'
                }],
            taskBody: {
                [todoId]: {
                    activeTasks: [{
                        id: taskId1,
                        title: "dfd",
                        description: null,
                        todoListId: todoId,
                        order: -1,
                        status: 0,
                        priority: 1,
                        startDate: null,
                        deadline: null,
                        addedDate: "2022-06-13T06:38:58.827",
                    }] as Array<TaskType>,
                    completedTasks: [{
                        id: taskId2,
                        title: "adasd",
                        description: null,
                        todoListId: todoId,
                        order: -2,
                        status: 1,
                        priority: 1,
                        startDate: null,
                        deadline: null,
                        addedDate: "2022-06-13T06:39:57.153",
                    }] as Array<TaskType>
                },
            },
            unauthorizedMode: true
        }
    }
)
test('filter should be changed', () => {

    let action = actions.changeFilterAC("b072220d-fb22-419f-9e90-27fb715cf285", 'Active')
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.tasksTitle[0].filter).toBe('Active')
})

test('Todo should be add', () => {
    let TodoItem = {
        id: "63a2f645-ec04-4c14-af49-7124e2a0a505",
        title: 'newTodo',
        addedDate: "2022-06-12T14:56:44.52",
        order: -2
    }
    let action = actions.createNewTodoAC(TodoItem)
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.tasksTitle.length).toBe(2)
})
test('Task should be added', () => {
    let action = actions.addTaskAC(newTask)
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.taskBody[newTask.todoListId].activeTasks.length).toBe(2)
})
test('task to be updated', () => {
    let updatedTask = {...stateToDo.taskBody[todoId].activeTasks[0], title: 'new task'}
    let action = actions.updateTaskAC(updatedTask)
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.taskBody[updatedTask.todoListId].activeTasks[0].title).toBe(updatedTask.title)
})
test('to-do name should be updated', () => {
    let action = actions.updateTodoNameAC('title updated', todoId)
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.tasksTitle[0].title).toBe('title updated')
})
test('ToDo should be removed', () => {
    let action = actions.removeTodoAC(todoId)
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.taskBody[todoId]).toBe(undefined)
    expect(newState.tasksTitle.length).toBe(0)
})
test('task should be deleted', () => {
    let action = actions.deleteTaskAC(taskId1, todoId)
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.taskBody[todoId].activeTasks.length).toBe(0)
    expect(newState.taskBody[todoId].completedTasks.length).toBe(1)
})
test('task to be checked', () => {
    let checkedTask = {...stateToDo.taskBody[todoId].activeTasks[0], status: 1}
    let action = actions.updateTaskAC(checkedTask)
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.taskBody[todoId].activeTasks.length).toBe(0)
    expect(newState.taskBody[todoId].completedTasks.length).toBe(2)
    expect(newState.taskBody[todoId].completedTasks[1].status).toBe(1)
})
test('todo to be unchecked', () => {
    let checkedTask = {...stateToDo.taskBody[todoId].completedTasks[0], status: 0}
    let action = actions.updateTaskAC(checkedTask)
    let newState = ToDoReducer(stateToDo, action)
    expect(newState.taskBody[todoId].activeTasks.length).toBe(2)
    expect(newState.taskBody[todoId].completedTasks.length).toBe(0)
    expect(newState.taskBody[todoId].activeTasks[1].status).toBe(0)
})


