import React from "react";
import './App.css';
import {Button} from "@mui/material";


type ButtonsBlockType= {
    filterHandler:(filter:string)=>void
    filter:string
}

export const ButtonsBlock:React.FC<ButtonsBlockType> = ({filterHandler,filter}) => {


    const onClickHandler = (filter:string) => {
        filterHandler(filter)
    }


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


