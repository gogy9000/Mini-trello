import React from 'react';
import './App.css';
import {ToDos} from "./Todos";
import {AppBar, Container, Grid, Typography} from "@mui/material";


function App() {


    return (
      
        <div>
            <AppBar>Todo</AppBar>
            <Typography mt={4}>
                <Container fixed  >
                    <Grid container >
                        <ToDos/>
                    </Grid>
                </Container>
            </Typography>

        </div>

    );
}

export default App;


