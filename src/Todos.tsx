import React, {useState} from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {taskTitle} from "./Types";
import {ToDo} from "./ToDo";
import {createNewTodoAC} from "./Redux/ToDoReducer";
import {CustomInput} from "./CustomInput";
import {CustomEditSpan} from "./CustomEditSpan";


export const ToDos = () => {

    let state = useSelector((state: any) => state.stateTaskBlock)
    let dispatch = useDispatch()
    let [todoName, setTodoName] = useState<string>('')

    const onEnterHandler = () => {
        dispatch(createNewTodoAC(todoName ? todoName : 'no name task'))
        // setEditTaskMode(false)
        setTodoName('')
    }
    const onDoubleClickHandler = () => {
        setTodoName('')
    }


    const todos = state.tasksTitle.map((task: taskTitle) => <ToDo key={task.id} task={task} state={state}/>)

    return (
        <div className="App">

            <CustomEditSpan value={todoName} onChangeText={setTodoName}
                            onClick={onDoubleClickHandler}
                            onBlur={onEnterHandler}
                            onDoubleClick={onDoubleClickHandler}
                            onEnter={onEnterHandler}
                            spanProps={{children : todoName ? undefined :'New Task'}} />
            {/*{editTaskMode && <CustomInput onChangeText={setTodoName} onEnter={onclickHandler}/>}*/}

            <span>{todos}</span>


        </div>
    )
}

