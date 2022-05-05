import {StateType, taskTitle} from "./Types";
import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {checkTaskAC, removeTodoAC, updateTodoNameAC} from "./Redux/ToDoReducer";
import {InputBlock} from "./InputBlock";
import {ButtonsBlock} from "./ButtonsBlock";
import {TaskBlockWrapper} from "./TaskBlockWrapper";
import {TaskTitleBlock} from "./TaskTitleBlock";
import {Grid, Paper, Typography} from "@mui/material";


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

    // const removeTodo = () => {
    //     dispatch(removeTodoAC(task.id))
    // }

    return (

        <div key={task.id} className={lastItem === 1 && !createMode ? 'todo-mapped-created' : 'todo-mapped'}>
            <Grid container direction={'row'}>
                <Typography align={'center'}>
                    <Paper>
                        <TaskTitleBlock task={task}
                                        error={error}
                                        setError={setError}
                                        onUpdateTodoMode={onUpdateTodoMode}
                                        updateTodoMode={updateTodoMode}
                                        todoName={todoName}
                                        todoNameChanger={todoNameChanger}
                                        updateTodoName={updateTodoName}/>

                        <Grid container direction={'column'} rowSpacing={2} mt={2}>
                            <Grid item>
                                <InputBlock dispatch={dispatch} state={state} idTitle={task.id}/>
                            </Grid>
                            <Grid item>
                                <TaskBlockWrapper state={state}
                                                  task={task}
                                                  filter={filter}
                                                  onCheckHandler={onCheckHandler}
                                                  dispatch={dispatch}/>
                            </Grid>
                            <Grid item>
                                <ButtonsBlock filterHandler={useSetFilterHandler} filter={filter}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Typography>
            </Grid>
        </div>
    )
}

