import React from "react";
import {Tasks} from "./Tasks";
import {Divider, Stack} from "@mui/material";
import {useSelectorApp} from "../../App";

type TaskBlockWrapperPropsType = {
    todoId: string
    filter: string
}
export const TasksContainer: React.FC<TaskBlockWrapperPropsType> = React.memo(({todoId, filter}) => {
        const activeTasks = useSelectorApp(state => state.toDoReducer.taskBody[todoId])

        return (

            <Stack direction="column"
                   divider={<Divider orientation="horizontal" flexItem/>}
                   spacing={1}>
                {
                    activeTasks.length === 0
                        ? <div>no active and completed tasks</div> : <Tasks todoId={todoId} tasks={activeTasks}/>
                }


            </Stack>
        )
    }
)
