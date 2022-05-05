import React from "react";
import {TaskBlock} from "./TaskBlock";
import {StateType, taskTitle} from "./Types";
import {actionType} from "./Redux/ToDoReducer";

type TaskBlockWrapperPropsType = {
    task: taskTitle
    state: StateType
    filter: string
    onCheckHandler: (d: string, idTitle: string) => void
    dispatch: (x: actionType) => void
}
export const TaskBlockWrapper: React.FC<TaskBlockWrapperPropsType> = ({
                                                                          state,
                                                                          task,
                                                                          filter,
                                                                          onCheckHandler,
                                                                          dispatch
                                                                      }) => {
    return (
        <>
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
        </>
    )
}