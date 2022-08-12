import React, {useMemo} from "react";
import {TaskType} from "../../Types";
import {Task} from "./Task";
import {useSelectorApp} from "../../App";

export type TaskBlockType = {
    todoId: string
    filter: string
}

export const Tasks: React.FC<TaskBlockType> = React.memo(({todoId, filter}) => {
        debugger
        const tasks =  useSelectorApp(state => {
            if (filter === 'All') {
                return state.toDoReducer.taskBody[todoId]
            }
            if (filter === 'Active') {
                return state.toDoReducer.taskBody[todoId]
                    .filter(task=>task.status===0)
            }
            if (filter === 'Completed') {
                return state.toDoReducer.taskBody[todoId]
                    .filter(task=>task.status===1)
            }else {
                return state.toDoReducer.taskBody[todoId]
            }


        })

        const mapTasks = tasks.map((task: TaskType) => <Task task={task}
                                                             key={task.id}
                                                             todoId={task.todoListId}/>
        )

        return (
            <>{tasks.length === 0 ? <div>no active and completed tasks</div> : <>{mapTasks}</>}</>
        )
    }
)