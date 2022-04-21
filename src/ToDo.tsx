import {StateType, taskTitle} from "./Types";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {checkTaskAC} from "./Redux/ToDoReducer";
import {Input} from "./Input";
import {TaskBlock} from "./TaskBlock";
import {ButtonsBlock} from "./ButtonsBlock";

type ToDoType = {
    task: taskTitle
    state: StateType
}
export const ToDo: React.FC<ToDoType> = ({task, state}) => {

    let dispatch = useDispatch()

    const onCheckHandler = (id: string, idTitle: string) => dispatch(checkTaskAC(id, idTitle))

    const [filter, setFilter] = useState<string>('All')

    const useSetFilterHandler = (filter: string) => setFilter(filter)


    return (
        <div key={task.id}>
            <h3>{task.titleName}</h3>

            <Input dispatch={dispatch}
                   state={state}

                   idTitle={task.id}
            />
            {state.taskBody[task.id].activeTasks.length === 0 && state.taskBody[task.id].completedTasks.length === 0 &&
                <div>no active and completed tasks</div>}

            <div>{filter === 'Completed' || 'All' &&
                <TaskBlock idTitle={task.id} tasks={state.taskBody[task.id].activeTasks} callBack={onCheckHandler}
                           dispatch={dispatch}/>}
            </div>

            <div className={'CompletedTasks'}>{filter === 'Active' || 'All' &&
                <TaskBlock idTitle={task.id} tasks={state.taskBody[task.id].completedTasks} callBack={onCheckHandler}
                           dispatch={dispatch}/>}
            </div>

            <ButtonsBlock filterHandler={useSetFilterHandler} filter={filter}/>

        </div>)
}