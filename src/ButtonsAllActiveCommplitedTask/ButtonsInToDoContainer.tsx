import React from "react";
import '../App.css';
import {Button, ButtonGroup} from "@mui/material";
import {useDispatch} from "react-redux";
import {actions} from "../Redux/ToDoReducer";


type ButtonsInToDoWrapperPropsType = {
    todoId: string
    filter: string
}

export const ButtonsInToDoContainer: React.FC<ButtonsInToDoWrapperPropsType> = React.memo(({todoId, filter}) => {

        const dispatch=useDispatch()
        const onClickHandler = (newFilter: string) => {
            dispatch(actions.changeFilterAC({todoId, newFilter}))
        }

        return (

            <ButtonGroup sx={{display:'flex', justifyContent:'center'}} >
                <Button color={filter === 'All' ? 'secondary' : 'primary'}
                        variant={ filter==='All'?"contained":"outlined"}
                        onClick={() => {
                            onClickHandler('All')
                        }}>all </Button>

                <Button color={filter === 'Active' ? 'secondary' : 'primary'}
                        variant={ filter==='Active'?"contained":"outlined"}
                        onClick={() => {
                            onClickHandler('Active')
                        }}>Active </Button>

                <Button color={filter === 'Completed' ? 'secondary' : 'primary'}
                        variant={ filter==='Completed'?"contained":"outlined"}
                        onClick={() => {
                            onClickHandler('Completed')
                        }}>Completed </Button>
            </ButtonGroup>

        )
    }
)



