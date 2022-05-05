import {StateType, taskTitle} from "./Types";
import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {checkTaskAC, removeTodoAC, updateTodoNameAC} from "./Redux/ToDoReducer";
import {InputBlock} from "./InputBlock";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";
import {CustomInput} from "./CustomInput";
import {CustomButton} from "./CustomButton";
import {Button, Grid, TextField} from "@mui/material";

type ToDoType = {
    task: taskTitle
    state: StateType
    createMode: boolean
    lastItem: number
}
export const ToDo: React.FC<ToDoType> = ({task, state, createMode, lastItem}) => {

    const [filter, setFilter] = useState<string>('All')
    const [updateTodoMode, setUpdateTodoMode] = useState<boolean>(false)
    const [todoName, setTodoName] = useState<string>('')
    const [error, setError] = useState<string>('')

    let dispatch = useDispatch()
    const onCheckHandler = (id: string, idTitle: string) => dispatch(checkTaskAC(id, idTitle))

    const todoNameChanger = (e: ChangeEvent<HTMLInputElement>) => setTodoName(e.currentTarget.value)


    const useSetFilterHandler = (filter: string) => setFilter(filter)

    const onUpdateTodoMode = () => setUpdateTodoMode(true)

    const updateTodoName = () => {
        dispatch(updateTodoNameAC(todoName ? todoName : 'unnamed task', task.id))
        setUpdateTodoMode(false)
    }

    const removeTodo = () => {
        dispatch(removeTodoAC(task.id))
    }

    return (

        <div key={task.id} className={lastItem === 1 && !createMode ? 'todo-mapped-created' : 'todo-mapped'}>


            {
                !updateTodoMode
                    ?
                    // <Grid item>
                    <div onClick={onUpdateTodoMode}>{task.titleName}</div>
                    // </Grid>
                    :
                    // <Grid item>
                    <div>
                        <TextField
                            size={'small'}
                            onClick={() => {
                                setError('')
                            }}
                            onChange={todoNameChanger}
                            value={todoName}
                            error={error ? true : false}
                            id="filled-error-helper-text"
                            label={'New task name'}
                            // helperText={updateTodoMode?"Press Enter.":'New task name'}
                            variant="filled"
                        />

                        <Button variant={'outlined'} onClick={updateTodoName} size={'small'}>update</Button>
                    </div>
                // </Grid>
                // <CustomInput onChange={todoNameChanger} onEnter={updateTodoName}
                //                value={todoName} error={error}/>

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
                <Button color={filter === 'All' ? 'secondary' : 'primary'}
                        onClick={() => {
                            setFilter('all')
                        }}>all </Button>

                <Button color={filter === 'Active' ? 'secondary' : 'primary'}
                        onClick={() => {
                            setFilter('Active')
                        }}>Active </Button>

                <Button color={filter === 'Completed' ? 'secondary' : 'primary'}
                        onClick={() => {
                            setFilter('Completed')
                        }}>Completed </Button>

                <Button color={'success'} onClick={() => {
                    removeTodo()
                }}>remove todo </Button>
            </div>

            {/*<ButtonsBlock filterHandler={useSetFilterHandler} filter={filter}/>*/}

        </div>

    )
}

