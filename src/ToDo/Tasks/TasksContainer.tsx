import React from "react";
import {Tasks} from "./Tasks";
import {Divider, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/ReduxStore";

type TaskBlockWrapperPropsType = {
    todoId: string
    filter: string
}
export const TasksContainer: React.FC<TaskBlockWrapperPropsType> = React.memo(({todoId, filter}) => {
        const activeTasks = useSelector((state: AppStateType) => state.ToDoReducer.taskBody[todoId].activeTasks)
        const completedTasks = useSelector((state: AppStateType) => state.ToDoReducer.taskBody[todoId].completedTasks)

        return (

            <Stack direction="column"
                   divider={<Divider orientation="horizontal" flexItem/>}
                   spacing={1}>
                {
                    activeTasks.length === 0 && completedTasks.length === 0
                    && <div>no active and completed tasks</div>
                }

                {
                    filter === 'All' &&<>
                        <Tasks todoId={todoId} tasks={activeTasks}/>
                        <Tasks todoId={todoId} tasks={completedTasks}/>
                    </>
                }

                {
                    filter === 'Completed' &&
                        <Tasks todoId={todoId} tasks={completedTasks}/>
                }

                {
                    filter === 'Active' &&
                        <Tasks todoId={todoId} tasks={activeTasks}/>
                }

            </Stack>
        )
    }
)
