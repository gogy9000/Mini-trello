import {TaskType} from "../../Types";
import React, {useCallback, useState} from "react";
import {thunks} from '../../Redux/ToDoReducer';
import {
    Box,
    Card,
    CardContent,
    Checkbox,
    Collapse,
    IconButton, IconButtonProps, LinearProgress,
    Typography
} from "@mui/material";
import {CheckCircleOutline, Clear, Create, RadioButtonUnchecked} from "@mui/icons-material";
import {CustomEditSpan} from "../../CustomComponent/CustomEditSpan";
import {styled} from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatchApp, useSelectorApp} from "../../App";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export type TaskPropsType = {
    todoId: string
    task: TaskType
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

        const [expanded, setExpanded] = React.useState(false);
        const [taskValue, setTaskValue] = useState<string>(task.title)
        const [error, setError] = useState<string>('')
        const [editModeControlled, setEditModeControlled] = useState<boolean>(false)

        const dispatch = useDispatchApp()
        const isWaitingId = useSelectorApp(store => store.appReducer.waitingList[task.id])

        const handleExpandClick = () => {
            setExpanded(!expanded);
        }

        const checkTask = useCallback(() => {
            dispatch(thunks.updateTask({...task, status: task.status === 0 ? 1 : 0}))
            setExpanded(false)
        }, [dispatch, task])


        const updateTask = useCallback(() => {

            if (!taskValue.trim()) {
                setEditModeControlled(true)
                setError('todo empty')
                return
            }

            dispatch(thunks.updateTask({...task, title: taskValue.trim()}))
            if (error !== '') {
                setError('')
            }
            setEditModeControlled(false)
            setExpanded(false)
        }, [dispatch, task, taskValue, error])

        const deleteTask = useCallback(() => {
            dispatch(thunks.deleteTask(todoId, task.id))
            setExpanded(false)
        }, [dispatch, task.id, todoId])

        const onEditMode = () => {
            setEditModeControlled(true)
        }


        return (
            <Card variant={"outlined"}>
                <Box sx={{display: 'flex', justifyContent: "flex-end", opacity: (task.status === 1 ? 0.5 : 1)}}>
                    <CardContent>
                        <Typography component={'div'} variant="body2" color="text.primary">
                            <CustomEditSpan value={taskValue}
                                            error={error}
                                            onEnter={updateTask}
                                            setError={setError}
                                            onChangeText={setTaskValue}
                                            editModeControlled={editModeControlled}
                                            setEditModeControlled={setEditModeControlled}
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
                                {!editModeControlled
                                    ?
                                    <IconButton onClick={onEditMode}>
                                        <Create/>
                                    </IconButton>
                                    :
                                    <IconButton onClick={updateTask}>
                                        <Create color='primary'/>
                                    </IconButton>
                                }

                                <Checkbox
                                    checked={task.status === 1}
                                    inputProps={{'aria-label': 'controlled'}}
                                    icon={<RadioButtonUnchecked/>}
                                    checkedIcon={<CheckCircleOutline/>}
                                    onChange={checkTask}
                                />
                            </Box>
                        </Collapse>
                    </Box>
                </Box>
                {isWaitingId && <LinearProgress/>}
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