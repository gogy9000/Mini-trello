import React, {useState} from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {taskTitle} from "./Types";
import {ToDo} from "./ToDo";
import {createNewTodoAC} from "./Redux/ToDoReducer";
import {CustomInput} from "./CustomInput";
import {CustomEditSpan} from "./CustomEditSpan";
import {CustomButton} from "./CustomButton";


export const ToDos = () => {

    let state = useSelector((state: any) => state.stateTaskBlock)
    let dispatch = useDispatch()
    let [todoName, setTodoName] = useState<string>('')
    const [createMode, setCreateMode] = useState<boolean>(false)

    const createTask = () => {
        if (!todoName && createMode) {
            return
        }
        dispatch(createNewTodoAC(todoName ? todoName : 'no name task'))
        setTodoName('')
        setCreateMode(false)


    }
    const onDoubleClickHandler = () => setTodoName('')


    const moveCreateTask = () => {
        setTodoName('')
        setCreateMode(true)
    }


    const todos = state.tasksTitle.map((task: taskTitle, index: number, arr: Array<taskTitle>) => <ToDo
        lastItem={arr.length - index} createMode={createMode} key={task.id} task={task} state={state}/>)


    return (
        <div className="App">

            <CustomEditSpan value={todoName} onChangeText={setTodoName}
                            className={'new-todo-input'}
                            onBlur={()=>{setTodoName('')}}
                            onDoubleClick={onDoubleClickHandler}
                            spanProps={{children: todoName ? undefined : ' Create new task'}}/>

            <CustomButton onMouseUp={moveCreateTask}
                          onMouseDown={createTask}
                          >Create</CustomButton>

            <div>{todos}</div>


        </div>
    )
}

