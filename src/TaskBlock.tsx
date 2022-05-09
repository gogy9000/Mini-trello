import React, {useState} from "react";
import {Task1Type} from "./Types";
import {deleteTaskAC, updateTaskAC} from "./ToDoReducerForReactUseReducer/ToDoReducerForUseReducer";
import {CustomEditSpan} from "./CustomEditSpan";
import { Checkbox, IconButton} from "@mui/material";
import {Check, Clear} from "@mui/icons-material";

export type TaskBlockType = {
    tasks: Array<Task1Type>
    callBack: (id: string,idTitle:string)=>void
    dispatch:(action:any)=>void
    idTitle:string

}


export const TaskBlock:React.FC<TaskBlockType> = ({tasks,callBack,dispatch,idTitle}) => {


    const mapTasks = tasks.map((taskElem: Task1Type) => <Task taskElem={taskElem}
                                                                callBack={callBack}
                                                                dispatch={dispatch}
                                                                idTitle={idTitle}/>

    //
    //     const [taskValue, setTaskValue] = useState<string>('')
    //     const [error,setError]=useState<string>('')
    //
    //     const checkTask = (id: string, idTitle: string) => {
    //         props.callBack(id, idTitle)
    //     }
    //
    //     const deleteTask = (id: string, idTitle: string) => {
    //         props.dispatch(deleteTaskAC(id, idTitle))
    //     }
    //
    //
    //
    //     const updateTask = (idTask: string, idTitle: string) => {
    //         if(!taskValue.trim()){
    //             setError('task is empty')
    //             return
    //         }
    //         props.dispatch(updateTaskAC(idTitle, idTask, taskValue))
    //     }
    //     const clearError = () => {
    //         setError('')
    //     }
    //
    //
    //
    //         return (
    //             <div key={taskElem.id}>
    //
    //                 <Checkbox
    //                     checked= {taskElem.isDone}
    //                     icon={<Check />}
    //                     checkedIcon={<Check />}
    //                     onClick={() => {
    //                         checkTask(taskElem.id, props.idTitle)
    //                     }}
    //                 />
    //                 <CustomEditSpan value={taskValue}
    //                                 onClick={clearError}
    //                                 error={error}
    //                                 onBlur={() => {
    //                                     updateTask(taskElem.id, props.idTitle)
    //                                     setTaskValue('')
    //                                 }}
    //                                 onChangeText={(text) => {
    //                                     setTaskValue(text)
    //                                 }}
    //                                 spanProps={{children:!taskElem.title? undefined : taskElem.title}}/>
    //
    //                 <IconButton onClick={() => {
    //                     deleteTask(taskElem.id, props.idTitle)
    //                 } }><Clear/></IconButton>
    //
    //             </div>
    //         )

    )

        return (
            <div>
                <div>
                    {mapTasks}
                </div>


            </div>

        )
    }

export type TaskPropsType = {
    // tasks: Array<Task1Type>
    callBack: (id: string,idTitle:string)=>void
    dispatch:(action:any)=>void
    idTitle:string
    taskElem:Task1Type

}

    const Task:React.FC<TaskPropsType> = ({callBack,dispatch,taskElem,idTitle}) => {

        const [taskValue, setTaskValue] = useState<string>('')
        const [error,setError]=useState<string>('')

        const checkTask = (id: string, idTitle: string) => {
            callBack(id, idTitle)
        }

        const deleteTask = (id: string, idTitle: string) => {
           dispatch(deleteTaskAC(id, idTitle))
        }



        const updateTask = (idTask: string, idTitle: string) => {
            if(!taskValue.trim()){
                setError('task is empty')
                return
            }
            dispatch(updateTaskAC(idTitle, idTask, taskValue))
        }
        const clearError = () => {
            setError('')
        }



        return (
            <div key={taskElem.id}>

                <Checkbox
                    checked= {taskElem.isDone}
                    icon={<Check />}
                    checkedIcon={<Check />}
                    onClick={() => {
                        checkTask(taskElem.id, idTitle)
                    }}
                />
                <CustomEditSpan value={taskValue}
                                onClick={clearError}
                                error={error}
                                onBlur={() => {
                                    updateTask(taskElem.id, idTitle)
                                    setTaskValue('')
                                }}
                                onChangeText={(text) => {
                                    setTaskValue(text)
                                }}
                                spanProps={{children:!taskElem.title? undefined : taskElem.title}}/>

                <IconButton onClick={() => {
                    deleteTask(taskElem.id, idTitle)
                } }><Clear/></IconButton>

            </div>
        )
    }
