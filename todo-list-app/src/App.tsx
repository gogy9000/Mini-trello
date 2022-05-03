import React from 'react';
import './App.css';
import {ToDos} from "./Todos";
import {AppBar, Grid} from "@mui/material";



function App() {

    return (
        <Grid container>

            <Grid item>

            <ToDos />
            </Grid>
        </Grid>
    );
}

export default App;


