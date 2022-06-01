import {TaskType} from "../../Types";
import React, {useCallback, useState} from "react";
import {actions} from '../../Redux/ToDoReducer';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Collapse,
    IconButton, IconButtonProps,
    Typography
} from "@mui/material";
import {CheckCircleOutline, Clear, Edit, RadioButtonUnchecked} from "@mui/icons-material";
import {CustomEditSpan} from "../../CustomComponent/CustomEditSpan";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export type TaskPropsType = {
    todoId: string
    task: TaskType
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

        const [expanded, setExpanded] = React.useState(false);

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };


        const dispatch = useDispatch()
        const [taskValue, setTaskValue] = useState<string>('')
        const [error, setError] = useState<string>('')

        const checkTask = useCallback(() => dispatch(actions.checkTaskAC(task.id, todoId)), [dispatch, task.id, todoId])

        const deleteTask = useCallback(() => dispatch(actions.deleteTaskAC(task.id, todoId)), [dispatch, task.id, todoId])

        const updateTask = useCallback(() => {
            dispatch(actions.updateTaskAC(todoId, task.id, taskValue.trim()))
            setError('')
        }, [dispatch, todoId, task.id, taskValue])

        return (
            <Card variant={"outlined"}>
                <Box sx={{display: 'flex', justifyContent: "flex-end"}}>
                    <CardContent>
                        <Typography component={'div'} variant="body2" color="text.secondary">
                            <CustomEditSpan value={taskValue}
                                            onClick={updateTask}
                                            error={error}
                                            setError={setError}
                                            onChangeText={setTaskValue}
                                            spanProps={{children: !task.title ? undefined : task.title}}
                            />
                        </Typography>
                    </CardContent>
                    <Box sx={{display: "flex", flexDirection: 'column'}}>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </ExpandMore>
                        <Collapse in={expanded}
                                  timeout="auto"
                                  unmountOnExit

                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'end',
                                alignItems: 'end'
                            }}>
                                <IconButton onClick={deleteTask}>
                                    <Clear/>
                                </IconButton>

                                <Checkbox
                                    checked={task.isDone}
                                    inputProps={{'aria-label': 'controlled'}}
                                    icon={<RadioButtonUnchecked/>}
                                    checkedIcon={<CheckCircleOutline/>}
                                    onChange={checkTask}
                                />
                            </Box>
                        </Collapse>
                    </Box>
                </Box>
            </Card>
        )
    }
)

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginRight: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));