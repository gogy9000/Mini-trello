import React from "react";
import {Button, Grid, Paper, TextField} from "@mui/material";


type CreateToDoWrapperPropsType = {
    todoName: string
    setTodoTitle: (newToDoTitle: string) => void
    moveCreateTask: () => void
    createTask: () => void
    error: string
}
export const CreateToDoInputWrapper: React.FC<CreateToDoWrapperPropsType> = ({
                                                                                 todoName,
                                                                                 setTodoTitle,
                                                                                 error,
                                                                                 moveCreateTask,
                                                                                 createTask
                                                                             }) => {


    return (
        <Paper elevation={12}>
            <Grid container
                  // m={2}
                  p={1}

                  columnSpacing={1}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                <Grid item  justifyContent='flex-start' xs={10} >
                    <TextField id="standard-error-helper-text" label="Create new todo" variant="standard"
                               value={todoName}
                               error={!!error}
                               fullWidth={true}
                               helperText={!!error?error:false}
                               // onBlur={() => {
                               //     setTodoTitle('')
                               // }}
                               onChange={(e) => {
                                   setTodoTitle(e.currentTarget.value)
                               }}/>
                </Grid>
                <Grid item  justifyContent='right'>
                    <Button variant="outlined" onMouseUp={moveCreateTask}
                            onMouseDown={createTask}
                    >Create</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}