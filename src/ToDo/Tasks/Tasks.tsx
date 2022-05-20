import React from "react";
import {TaskType} from "../../Types";
import {Task} from "./Task";

export type TaskBlockType = {
    tasks: Array<TaskType>
    todoId: string
}

export const Tasks: React.FC<TaskBlockType> = React.memo(({tasks, todoId}) => {

        const mapTasks = tasks.map((task: TaskType) => <Task task={task}
                                                             key={task.id}
                                                             todoId={todoId}/>
        )

        return (
            <div>
                <div>
                    {mapTasks}
                </div>
            </div>
        )
    }
)