import React from "react";
import {getActiveTasksAC} from "./Redux/TaskBlokReducer";

type ButtonsBlockType={
    dispatch: (action:any) => void
}

export const ButtonsBlock = (props: ButtonsBlockType) => {

    const onActiveTasks = () => {
        props.dispatch(getActiveTasksAC())

    }

    return (
        <div>
            <button>All</button>
            <button onClick={onActiveTasks}>Active</button>
            <button>Completed</button>
        </div>
    )
}