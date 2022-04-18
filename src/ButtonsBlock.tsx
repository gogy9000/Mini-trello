import React, {FC} from "react";
import { setTaskFilterModeAC} from "./Redux/TaskBlokReducer";
import {setTaskFilterModeACType} from "./Redux/TaskBlokReducer";
import './App.css';

type ButtonsBlockType={
    dispatch:(action: setTaskFilterModeACType)=>void
    taskFilterMode:string
}

export const ButtonsBlock:React.FC<ButtonsBlockType> = ({dispatch,taskFilterMode}) => {


    const onClickHandler = (filterMode:string) => {
        dispatch(setTaskFilterModeAC(filterMode))
    }


    return (
        <div>
            <CustomButton onClickHandler={onClickHandler}
                          className={taskFilterMode==='All'?'activeButton':''}
                          buttonName={'All'}  />
            <CustomButton onClickHandler={onClickHandler}
                          className={taskFilterMode==='Active'?'activeButton':''}
                          buttonName={'Active'}  />
            <CustomButton onClickHandler={onClickHandler}
                          className={taskFilterMode==='Completed'?'activeButton':''}
                          buttonName={'Completed'}  />

        </div>
    )
}

type CustomButtonPropsType={
    onClickHandler:(buttonName: string)=>void
    buttonName: string
    className:string
}
const CustomButton:FC<CustomButtonPropsType> = ({onClickHandler,buttonName,className}) => {
    return(
        <button className={className}
            onClick={()=>onClickHandler(buttonName)}>{buttonName}</button>
    )

}