import React from "react";
import '../App.css';
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {actions} from "../Redux/ToDoReducer";


type ButtonsInToDoWrapperPropsType = {
    todoId: string
    filter: string
}

export const ButtonsInToDoWrapper: React.FC<ButtonsInToDoWrapperPropsType> = React.memo(({todoId, filter}) => {

        const dispatch=useDispatch()

        const onClickHandler = (filter: string) => dispatch(actions.changeFilterAC(todoId,filter))

        return (

            <div>
                <Button color={filter === 'All' ? 'secondary' : 'primary'}
                        onClick={() => {
                            onClickHandler('All')
                        }}>all </Button>

                <Button color={filter === 'Active' ? 'secondary' : 'primary'}
                        onClick={() => {
                            onClickHandler('Active')
                        }}>Active </Button>

                <Button color={filter === 'Completed' ? 'secondary' : 'primary'}
                        onClick={() => {
                            onClickHandler('Completed')
                        }}>Completed </Button>
            </div>

        )
    }
)



