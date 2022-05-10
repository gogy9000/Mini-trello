import {StateType, taskTitle} from "../Types";
import React, {ChangeEvent, useState} from "react";

import {actionType, checkTaskAC, updateTodoNameAC} from "../ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {InputBlock} from "./InputAddTask/InputBlock";
import {ButtonsBlock} from "../ButtonsAllActiveCommplitedTask/ButtonsBlock";
import {TasksWrapper} from "./Tasks/TasksWrapper";
import {TitleToDoWrapper} from "./TitleTodo/TitleToDoWrapper";
import {Divider, Grid, Paper, Typography} from "@mui/material";


type ToDoType = {
    task: taskTitle
    state: StateType
    createMode?: boolean
    lastItem: number
    dispatch:(type:actionType)=>void
}
export const ToDo: React.FC<ToDoType> = ({dispatch, task, state, createMode, lastItem}) => {

    const [filter, setFilter] = useState<string>('All')
    const [updateTodoMode, setUpdateTodoMode] = useState<boolean>(false)
    const [todoName, setTodoName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onCheckHandler = (id: string, idTitle: string) => dispatch(checkTaskAC(id, idTitle))

    const todoNameChanger = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoName(e.currentTarget.value)
    }


    const useSetFilterHandler = (filter: string) => setFilter(filter)

    const onUpdateTodoMode = () => setUpdateTodoMode(true)

    const updateTodoName = () => {
        if(!todoName.trim()){
            setError('Title must not be empty')
            return
        }
        dispatch(updateTodoNameAC(todoName ? todoName.trim() : 'unnamed task', task.id))
        setUpdateTodoMode(false)
    }

    return (

        <Paper elevation={24}>
            <Grid container
                    p={2}
                  direction={"column"}
                  justifyContent="center"
                  alignItems="center">

                    <Grid item container justifyContent="right" alignItems='flex-end' p={3}>
                        <Typography variant={"h5"}>
                            <TitleToDoWrapper task={task}
                                              error={error}
                                              setError={setError}
                                              onUpdateTodoMode={onUpdateTodoMode}
                                              updateTodoMode={updateTodoMode}
                                              todoName={todoName}
                                              todoNameChanger={todoNameChanger}
                                              updateTodoName={updateTodoName}
                                              dispatch={dispatch}/>
                            <Divider />
                        </Typography>
                    </Grid>

                <Grid item container direction={'column'} rowSpacing={2}  justifyContent={'center'}>

                    <Grid item  >
                        <InputBlock dispatch={dispatch} state={state} idTitle={task.id}/>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography>
                            <TasksWrapper state={state}
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

