import React from 'react';
import './App.css';
import {TodoContainer} from "./ToDo/TodoContainer";
import {Container, Grid} from "@mui/material";
import {PrimarySearchAppBar} from "./AppBar/AppBar";


export const App = React.memo(function App() {

        console.log('render App')
        return (

            <>

                <PrimarySearchAppBar/>

                <Grid  container direction='column' justifyContent='end' spacing={1} pl={3} pr={3}>
                        <TodoContainer/>
                </Grid>
            </>
        )
            ;
    }
)




