import React from 'react';
import './App.css';
import {ToDoWrapper} from "./ToDo/ToDoWrapper";
import {AppBar, Container, Grid, Paper, Typography} from "@mui/material";
import PrimarySearchAppBar from "./AppBar/AppBar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {CreateToDoInputWrapper} from "./CreateTodo/CreateToDoInputWrapper";


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


type AccordionWrapperPropsType={
    createTask:()=>void
    moveCreateTask:()=>void
    todoName:string
    SetToDoTitle:(todoTitle:string)=>void
    error:string
}


export  const AccordionWrapper:React.FC<AccordionWrapperPropsType>=({createTask,
                                                                        moveCreateTask,
                                                                        todoName,
                                                                        SetToDoTitle,
                                                                        error})=> {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>New Todo</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <CreateToDoInputWrapper createTask={createTask}
                                                moveCreateTask={moveCreateTask}
                                                todoName={todoName}
                                                setTodoTitle={SetToDoTitle}
                                                error={error}/>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

