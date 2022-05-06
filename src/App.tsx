import React from 'react';
import './App.css';
import {ToDos} from "./Todos";
import {AppBar, Container, Grid, Paper, Typography} from "@mui/material";
import PrimarySearchAppBar from "./AppBar/AppBar";


function App() {


    return (

        <>
            <PrimarySearchAppBar/>
            <Container fixed>
                <ToDos/>
            </Container>
        </>

    )
        ;
}

export default App;


