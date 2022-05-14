import React from "react";
import {Task1Type} from "../../Types";
import {Task} from "./Task";

export type TaskBlockType = {
    tasks: Array<Task1Type>
    callBack: (id: string, idTitle: string) => void
    dispatch: (action: any) => void
    idTitle: string

}


 const TasksMemo: React.FC<TaskBlockType> = ({tasks, callBack, dispatch, idTitle}) => {


    const mapTasks = tasks.map((taskElem: Task1Type) => <Task taskElem={taskElem}
                                                              callBack={callBack}
                                                              dispatch={dispatch}
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