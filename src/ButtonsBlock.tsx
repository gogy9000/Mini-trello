import React from "react";
import './App.css';
import {CustomButton} from "./CustomButton";


type ButtonsBlockType= {
    filterHandler:(filter:string)=>void
    filter:string
}

export const ButtonsBlock:React.FC<ButtonsBlockType> = ({filterHandler,filter}) => {


    const onClickHandler = (filter:string) => {
        filterHandler(filter)
    }


    return (
        <div>
            {/*<CustomButton onClickHandler={onClickHandler}*/}
            {/*              className={filter==='All'?'activeButton':''}*/}
            {/*              buttonName={'All'}  />*/}
            {/*<CustomButton onClickHandler={onClickHandler}*/}
            {/*              className={filter==='Active'?'activeButton':''}*/}
            {/*              buttonName={'Active'}  />*/}
            {/*<CustomButton onClickHandler={onClickHandler}*/}
            {/*              className={filter==='Completed'?'activeButton':''}*/}
            {/*              buttonName={'Completed'}  />*/}
        </div>
    )
}


