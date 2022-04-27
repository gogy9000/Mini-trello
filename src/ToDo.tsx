import {StateType, taskTitle} from "./Types";
import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {checkTaskAC, removeTodoAC, updateTodoNameAC} from "./Redux/ToDoReducer";
import {InputBlock} from "./InputBlock";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";
import {CustomInput} from "./CustomInput";
import {CustomButton} from "./CustomButton";

type ToDoType = {
    task: taskTitle
    state: StateType
    createMode:boolean
    lastItem:number
}
export const ToDo: React.FC<ToDoType> = ({task, state,createMode,lastItem}) => {

    let dispatch = useDispatch()

    const onCheckHandler = (id: string, idTitle: string) => dispatch(checkTaskAC(id, idTitle))

    const [filter, setFilter] = useState<string>('All')
    const [updateTodoMode, setUpdateTodoMode] = useState<boolean>(false)
    const [todoName, setTodoName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const todoNameChanger = (e: ChangeEvent<HTMLInputElement>) => {

        setTodoName(e.currentTarget.value)
    }

    const useSetFilterHandler = (filter: string) => setFilter(filter)

    const onUpdateTodoMode = () => setUpdateTodoMode(true)

    const updateTodoName = () => {

        dispatch(updateTodoNameAC(todoName ? todoName : 'no name', task.id))
        setUpdateTodoMode(false)
    }

    const removeTodo = () => {
        dispatch(removeTodoAC(task.id))
    }
    console.log(lastItem)
    return (
        <div key={task.id} className={lastItem===1&&!createMode?'todo-mapped-created':'todo-mapped'}>
            {
                !updateTodoMode
                    ? <h3 onClick={onUpdateTodoMode}>{task.titleName}</h3>
                    : <CustomInput onChange={todoNameChanger} onEnter={updateTodoName}
                                   value={todoName} error={error}/>

            }


            <InputBlock dispatch={dispatch} state={state} idTitle={task.id}/>

            {
                state.taskBody[task.id].activeTasks.length === 0
                && state.taskBody[task.id].completedTasks.length === 0
                && <div>no active and completed tasks</div>
            }

            <div>
                {
                    filter === 'Completed' || 'All'
                    && <TaskBlock idTitle={task.id} tasks={state.taskBody[task.id].activeTasks}
                                  callBack={onCheckHandler} dispatch={dispatch}/>
                }
            </div>

            <div className={'CompletedTasks'}>
                {
                    filter === 'Active' || 'All'
                    && <TaskBlock idTitle={task.id} tasks={state.taskBody[task.id].completedTasks}
                                  callBack={onCheckHandler} dispatch={dispatch}/>
                }
            </div>
            <div>
                <CustomButton className={filter === 'All' ? 'activeButton' : ''}
                              onClick={() => {
                                  setFilter('all')
                              }}>all </CustomButton>

                <CustomButton className={filter === 'Active' ? 'activeButton' : ''}
                              onClick={() => {
                                  setFilter('Active')
                              }}>Active </CustomButton>

                <CustomButton className={filter === 'Completed' ? 'activeButton' : ''}
                              onClick={() => {
                                  setFilter('Completed')
                              }}>Completed </CustomButton>

                <CustomButton onClick={() => {
                    removeTodo()
                }}>remove todo </CustomButton>
            </div>
            <ButtonsBlock filterHandler={useSetFilterHandler} filter={filter}/>

        </div>)
}

