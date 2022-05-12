import React from "react";
import {Tasks} from "./Tasks";
import {StateType, taskTitle} from "../../Types";
import {ActionsType} from "../../ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {Divider, Stack} from "@mui/material";

type TaskBlockWrapperPropsType = {
    task: taskTitle
    state: StateType
    filter: string
    onCheckHandler: (id: string, idTitle: string) => void
    dispatch: (action: ActionsType) => void
}
export const TasksWrapper: React.FC<TaskBlockWrapperPropsType> = ({
                                                                          state,
                                                                          task,
                                                                          filter,
                                                                          onCheckHandler,
                                                                          dispatch
                                                                      }) => {
    return (
        <Stack direction="column"
               divider={<Divider orientation="horizontal" flexItem />}
               spacing={1}>
            {
                state.taskBody[task.id].activeTasks.length === 0
                && state.taskBody[task.id].completedTasks.length === 0
                && <div>no active and completed tasks</div>
            }

            <div>
                {
                    filter === 'Completed' || 'All'
                    && <Tasks idTitle={task.id} tasks={state.taskBody[task.id].activeTasks}
                              callBack={onCheckHandler} dispatch={dispatch}/>
                }
            </div>

            <div className={'CompletedTasks'}>
                {
                    filter === 'Active' || 'All'
                    && <Tasks idTitle={task.id} tasks={state.taskBody[task.id].completedTasks}
                              callBack={onCheckHandler} dispatch={dispatch}/>
                }
            </div>
        </Stack>
    )
}