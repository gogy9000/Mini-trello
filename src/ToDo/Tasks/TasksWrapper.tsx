import React, {useReducer} from "react";
import {Tasks} from "./Tasks";
import {StateType, Task1Type, taskBodyType, TaskTitleType} from "../../Types";
import {ActionsType, initialState, ToDoReducer} from '../../Redux/ToDoReducer';
import {Divider, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/ReduxStore";

type TaskBlockWrapperPropsType = {
    idTitle: string
    filter: string


}
const TasksWrapperMemo: React.FC<TaskBlockWrapperPropsType> = ({
                                                                   idTitle,
                                                                   filter
                                                               }) => {
    const activeTasks = useSelector((state: AppStateType) => state.stateTodo.taskBody[idTitle].activeTasks)
    const completedTasks = useSelector((state: AppStateType) => state.stateTodo.taskBody[idTitle].completedTasks)

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
                    && <Tasks idTitle={idTitle}
                              tasks={activeTasks}
                    />
                }
            </div>

            <div className={'CompletedTasks'}>
                {
                    filter === 'Active' || 'All'
                    && <Tasks idTitle={idTitle}
                              tasks={completedTasks}


                    />
                }
            </div>
        </Stack>
    )
}
export const TasksWrapper = React.memo(TasksWrapperMemo)