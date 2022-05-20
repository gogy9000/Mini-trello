import React, {useState} from "react";
import {Button, Grid, Paper, TextField} from "@mui/material";
import {actions, ActionsType} from '../Redux/ToDoReducer';
import {useDispatch} from "react-redux";


type CreateToDoWrapperPropsType = {

}
const CreateToDoInputWrapperMemoize: React.FC<CreateToDoWrapperPropsType> = () => {

    const dispatch = useDispatch()
    const [todoName, setTodoName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const createTask = () => {

        if (!todoName.trim()) {
            setError('To do title must not be empty')
            return
        }
        dispatch(actions.createNewTodoAC(todoName.trim()))
        setTodoName('')
        setError('')
    }

    const setToDoTitle = (newToDoTitle: string) => {
        setError('')
        setTodoName(newToDoTitle)
    }

    return (
        <Paper elevation={12}>
            <Grid container
                  p={1}
                  columnSpacing={0}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                <Grid item justifyContent='flex-start' xs={10}>
                    <TextField id="standard-error-helper-text" label="Create new todo" variant="standard"
                               value={todoName}
                               error={!!error}
                               fullWidth={true}
                               helperText={!!error ? error : false}
                               onChange={(e) => {
                                   setToDoTitle(e.currentTarget.value)
                               }}/>
                </Grid>
                <Grid item justifyContent='flex-end' xs={"auto"}>
                    <Button variant="outlined"
                            size={'small'}
                            onMouseDown={createTask}
                    >Create</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}
export const CreateToDoInputWrapper = React.memo(CreateToDoInputWrapperMemoize)