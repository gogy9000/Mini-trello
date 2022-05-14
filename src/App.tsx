import React from 'react';
import './App.css';
import {ToDoWrapper} from "./ToDo/ToDoWrapper";
import {Container} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";


export const App =React.memo( function  App() {

    console.log('render App')
    return (

        <>
            <PrimarySearchAppBar/>

            <Container fixed>
                <ToDoWrapper/>
            </Container>
        </>

    )
        ;
}
)




