import React from "react";
import {Task1Type} from "../../Types";
import {Task} from "./Task";

export type TaskBlockType = {
    tasks: Array<Task1Type>
    idTitle: string

}


 const TasksMemo: React.FC<TaskBlockType> = ({tasks, idTitle}) => {


    const mapTasks = tasks.map((taskElem: Task1Type) => <Task taskElem={taskElem}
                                                              key={taskElem.id}
                                                              idTitle={idTitle}/>
    )

    return (
        <div>
            <div>
                {mapTasks}
            </div>


        </div>

    )
}

export const Tasks=React.memo(TasksMemo)