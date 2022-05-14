import React, {useReducer} from "react";
import {Tasks} from "./Tasks";
import {StateType, Task1Type, taskBodyType, taskTitle} from "../../Types";
import {ActionsType, initialState, ToDoReducer} from "../../ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {Divider, Stack} from "@mui/material";

type TaskBlockWrapperPropsType = {
    idTitle:string
    completedTasks: Task1Type[]
    activeTasks: Task1Type[]
    filter: string
    onCheckHandler: (id: string, idTitle: string) => void
    dispatch: (action: ActionsType) => void
}
const TasksWrapperMemo: React.FC<TaskBlockWrapperPropsType> = ({
                                                                   completedTasks,
                                                                   activeTasks,
                                                                   idTitle,
                                                                   filter,
                                                                   onCheckHandler,
                                                                   dispatch

                                                               }) => {

    console.log('render TasksWrapperMemo')
    return (

        <Stack direction="column"
               divider={<Divider orientation="horizontal" flexItem/>}
               spacing={1}>
            {
                activeTasks.length === 0
                && completedTasks.length === 0
                && <div>no active and completed tasks</div>
            }

            <div>
                {
                    filter === 'Completed' || 'All'
                    && <Tasks idTitle={idTitle} tasks={activeTasks}
                              callBack={onCheckHandler} dispatch={dispatch}/>
                }
            </div>

            <div className={'CompletedTasks'}>
                {
                    filter === 'Active' || 'All'
                    && <Tasks idTitle={idTitle} tasks={completedTasks}
                              callBack={onCheckHandler} dispatch={dispatch}/>
                }
            </div>
        </Stack>
    )
}
export const TasksWrapper = React.memo(TasksWrapperMemo)