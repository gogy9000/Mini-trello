import React from 'react';
import './App.css';
import {ToDoWrapper} from "./ToDo/ToDoWrapper";
import {AppBar, Container, Grid, Paper, Typography} from "@mui/material";
import PrimarySearchAppBar from "./AppBar/AppBar";


function App() {


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

export default App;


