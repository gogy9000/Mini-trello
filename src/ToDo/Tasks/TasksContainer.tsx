import React from "react";
import {Tasks} from "./Tasks";
import {Divider, Stack} from "@mui/material";
import {useSelectorApp} from "../../App";

type TaskBlockWrapperPropsType = {
    todoId: string
    filter: string
}
export const TasksContainer: React.FC<TaskBlockWrapperPropsType> = React.memo(({todoId, filter}) => {

        return (

            <Stack direction="column"
                   divider={<Divider orientation="horizontal" flexItem/>}
                   spacing={1}>
                <Tasks todoId={todoId} filter={filter} />

            </Stack>
        )
    }
)
