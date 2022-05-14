import {StateType, Task1Type, taskBodyType, taskTitle} from "../Types";
import React, {ChangeEvent, useState} from "react";

import {
    ActionsType,
    actions
} from "../ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {InputBlockForAddTask} from "./InputAddTask/InputBlockForAddTask";
import {ButtonsInToDoWrapper} from "../ButtonsAllActiveCommplitedTask/ButtonsInToDoWrapper";
import {TasksWrapper} from "./Tasks/TasksWrapper";
import {TitleToDoWrapper} from "./TitleTodo/TitleToDoWrapper";
import {Divider, Grid, Paper, Typography} from "@mui/material";


type ToDoType = {
    task: taskTitle

    dispatch: (type: ActionsType) => void
    completedTasks:Array<Task1Type>
    activeTasks:Array<Task1Type>

}
const ToDoMemoize: React.FC<ToDoType> = ({dispatch, task,completedTasks,activeTasks }) => {

    const [filter, setFilter] = useState<string>('All')
    const [error, setError] = useState<string>('')


    const onCheckHandler = (id: string, idTitle: string) => dispatch(actions.checkTaskAC(id, idTitle))


    const useSetFilterHandler = (filter: string) => setFilter(filter)


    console.log('render ToDo')
    return (

        <Paper elevation={24}>
            <Grid container
                  p={2}
                  direction={"column"}
                  justifyContent="center"
                  alignItems="center">

                <Grid item container justifyContent="right" alignItems='flex-end' p={3}>
                    <Typography variant={"h5"} component={'div'}>
                        <TitleToDoWrapper task={task}
                                          error={error}
                                          setError={setError}
                                          dispatch={dispatch}/>
                        <Divider/>
                    </Typography>
                </Grid>

                <Grid item container direction={'column'} rowSpacing={2} justifyContent={'center'}>

                    <Grid item>
                        <InputBlockForAddTask dispatch={dispatch} idTitle={task.id}/>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography component={'div'}>
                            <TasksWrapper
                                activeTasks={activeTasks}
                                completedTasks={completedTasks}
                                idTitle={task.id}
                                filter={filter}
                                onCheckHandler={onCheckHandler}
                                dispatch={dispatch}
                            />
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent="center" alignItems="flex-end" m={1}>
                        <Paper elevation={6}>
                            <ButtonsInToDoWrapper filterHandler={useSetFilterHandler} filter={filter}/>
                        </Paper>
                    </Grid>

                </Grid>


            </Grid>
        </Paper>

    )
}
export const ToDo = React.memo(ToDoMemoize)

