import React, {FC} from "react";
import { setTaskFilterModeAC} from "./Redux/TaskBlokReducer";
import {setTaskFilterModeACType} from "./Redux/TaskBlokReducer";


type ButtonsBlockType={
    dispatch:(action: setTaskFilterModeACType)=>void
}

export const ButtonsBlock:React.FC<ButtonsBlockType> = ({dispatch}) => {


    const onClickHandler = (filterMode:string) => {
        dispatch(setTaskFilterModeAC(filterMode))
    }


    return (
        <div>
            <CustomButton onClickHandler={onClickHandler}
                          buttonName={'All'}  />
            <CustomButton onClickHandler={onClickHandler}
                          buttonName={'Active'}  />
            <CustomButton onClickHandler={onClickHandler}
                          buttonName={'Completed'}  />

        </div>
    )
}

type CustomButtonPropsType={
    onClickHandler:(buttonName: string)=>void
    buttonName: string
}
const CustomButton:FC<CustomButtonPropsType> = ({onClickHandler,buttonName}) => {
    return(
        <button onClick={()=>onClickHandler(buttonName)}>{buttonName}</button>
    )

}