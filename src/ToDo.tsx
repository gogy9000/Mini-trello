import {StateType, taskTitle} from "./Types";
import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {checkTaskAC, removeTodoAC, updateTodoNameAC} from "./Redux/ToDoReducer";
import {InputBlock} from "./InputBlock";
import {ButtonsBlock} from "./ButtonsBlock";
import {TaskBlockWrapper} from "./TaskBlockWrapper";
import {TaskTitleBlock} from "./TaskTitleBlock";
import {Divider, Grid, Paper, Typography} from "@mui/material";


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

        <Paper elevation={24}>
            <Grid container
                    p={2}
                  direction={"column"}
                  justifyContent="center"
                  alignItems="center">

                    <Grid item container justifyContent="right" alignItems='flex-end' p={3}>
                        <Typography variant={"h5"}>
                            <TaskTitleBlock task={task}
                                            error={error}
                                            setError={setError}
                                            onUpdateTodoMode={onUpdateTodoMode}
                                            updateTodoMode={updateTodoMode}
                                            todoName={todoName}
                                            todoNameChanger={todoNameChanger}
                                            updateTodoName={updateTodoName}/>
                            <Divider />
                        </Typography>
                    </Grid>

                <Grid item container direction={'column'} rowSpacing={2}  justifyContent={'center'}>
                    <Grid item  >
                        <InputBlock dispatch={dispatch} state={state} idTitle={task.id}/>
                    </Grid>
                    <Grid container item justifyContent='center'>
                        <Typography>
                            <TaskBlockWrapper state={state}
                                              task={task}
                                              filter={filter}
                                              onCheckHandler={onCheckHandler}
                                              dispatch={dispatch}/>
                        </Typography>
                    </Grid>
                    <Grid container item justifyContent="center" alignItems="flex-end" m={1}>
                        <Paper elevation={6}>
                            <ButtonsBlock filterHandler={useSetFilterHandler} filter={filter}/>
                        </Paper>
                    </Grid>

                </Grid>


            </Grid>
        </Paper>

    )
}

