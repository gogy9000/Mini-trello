import React, {useState} from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {taskTitle} from "./Types";
import {ToDo} from "./ToDo";
import {createNewTodoAC} from "./Redux/ToDoReducer";
import {CustomEditSpan} from "./CustomEditSpan";
import {CustomButton} from "./CustomButton";
import {Button, Grid, TextField} from "@mui/material";



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
            <div>
            <TextField  id="outlined-basic" label="Create new todo" variant="standard"
                       value={todoName}
                       onBlur={() => {
                           setTodoName('')
                       }}
                       onChange={(e)=> {
                           setTodoName(e.currentTarget.value)
                       }} />

            {/*<CustomEditSpan value={todoName} onChangeText={setTodoName}*/}
            {/*                className={'new-todo-input'}*/}
            {/*                onBlur={() => {*/}
            {/*                    setTodoName('')*/}
            {/*                }}*/}
            {/*                onDoubleClick={onDoubleClickHandler}*/}
            {/*                spanProps={{children: todoName ? undefined : ' Create new task'}}/>*/}

            {/*<CustomButton onMouseUp={moveCreateTask}*/}
            {/*              onMouseDown={createTask}*/}
            {/*>Create</CustomButton>*/}
            <Button variant="outlined" onMouseUp={moveCreateTask}
                    onMouseDown={createTask}
            >Create</Button>

            <div >{todos}</div>

            </div>

    )
}

