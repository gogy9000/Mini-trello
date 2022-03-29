import React from 'react';
import './App.css';
import {Todo} from "./Todo";
import {AppPropsType} from "./Types";


function App(props: AppPropsType) {
    return (
        <div>
            <Todo tasks={props.state.taskArr1}/>

        </div>

    );
}

export default App;


