import React from 'react';
import './App.css';
import {ToDos} from "./Todos";
import {AppBar, Container, Grid, Paper, Typography} from "@mui/material";


function App() {


    return (

        <div>
            <Container fixed>
                <Grid container>
                    <ToDos/>
                </Grid>
           
        </Container>
</div>

)
    ;
}

export default App;


