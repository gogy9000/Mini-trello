import React, {useReducer} from "react";
import {Tasks} from "./Tasks";
import {StateType, Task1Type, taskBodyType, TodoTitleType} from "../../Types";
import {ActionsType, initialState, ToDoReducer} from '../../Redux/ToDoReducer';
import {Divider, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/ReduxStore";

type TaskBlockWrapperPropsType = {
    todoId: string
    filter: string


}
export const TasksWrapper:React.FC<TaskBlockWrapperPropsType> = React.memo( ({
                                                                   todoId,
                                                                   filter
                                                               }) => {
    const activeTasks = useSelector((state: AppStateType) => state.stateTodo.taskBody[todoId].activeTasks)
    const completedTasks = useSelector((state: AppStateType) => state.stateTodo.taskBody[todoId].completedTasks)

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
                    && <Tasks todoId={todoId}
                              tasks={activeTasks}
                    />
                }
            </div>

            <div className={'CompletedTasks'}>
                {
                    filter === 'Active' || 'All'
                    && <Tasks todoId={todoId}
                              tasks={completedTasks}


                    />
                }
            </div>
        </Stack>
    )
}
)
