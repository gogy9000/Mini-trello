import {TaskTitleType} from "../Types";
import React, {useState} from "react";
import {InputBlockForAddTask} from "./InputAddTask/InputBlockForAddTask";
import {ButtonsInToDoWrapper} from "../ButtonsAllActiveCommplitedTask/ButtonsInToDoWrapper";
import {TasksWrapper} from "./Tasks/TasksWrapper";
import {TitleToDoWrapper} from "./TitleTodo/TitleToDoWrapper";
import {Divider, Grid, Paper, Typography} from "@mui/material";
import {useDispatch} from "react-redux";


type ToDoPropsType = {
    task: TaskTitleType
}
export const ToDo: React.FC<ToDoPropsType> = React.memo(({task}) => {
        const dispatch = useDispatch()
        const [filter, setFilter] = useState<string>('All')
        const [error, setError] = useState<string>('')


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
                            <TitleToDoWrapper
                                task={task}
                                error={error}
                                setError={setError}
                            />
                            <Divider/>
                        </Typography>
                    </Grid>

                    <Grid item container direction={'column'} rowSpacing={2} justifyContent={'center'}>

                        <Grid item>
                            <InputBlockForAddTask
                                dispatch={dispatch}
                                idTitle={task.id}
                            />
                        </Grid>

                        <Grid container item justifyContent='center'>
                            <Typography component={'div'}>
                                <TasksWrapper
                                    idTitle={task.id}
                                    filter={filter}
                                />
                            </Typography>
                        </Grid>

                        <Grid container item justifyContent="center" alignItems="flex-end" m={1}>
                            <Paper elevation={6}>
                                <ButtonsInToDoWrapper
                                    filterHandler={useSetFilterHandler}
                                    filter={filter}
                                />
                            </Paper>
                        </Grid>

                    </Grid>


                </Grid>
            </Paper>

        )
    }
)


