import React, {DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState} from "react";
import {CustomInput} from "./CustomInput";
import {Create} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
type CustomEditSpanPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
    onClick?:()=>void
}
export const CustomEditSpan: React.FC<CustomEditSpanPropsType> = ({
      value, error,  autoFocus, onBlur, onEnter, onClick,
        spanProps,onChangeText, ...restProps
    }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallBack = () => {
        setEditMode(false)
        onEnter && onEnter()
    }

    const onBlurCallBack = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)

        onBlur && onBlur(e)
    }

    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
        onDoubleClick && onDoubleClick(e)

    }
    const onClickCallback = () => {
        setEditMode(true)
        onClick && onClick()
    }
    const finalClassName = `${className}`

    return (
        <>
            {
                editMode
                    ? <span>
                    <TextField
                               error={!!error}
                               id="outlined-error"
                               label="Error"
                               value={value}/>
                    {/*<CustomInput onClick={onClick}*/}
                    {/*    autoFocus*/}
                    {/*    onBlur={onBlurCallBack}*/}
                    {/*    onEnter={onEnterCallBack}*/}
                    {/*    onChangeText={onChangeText}*/}
                    {/*    {...restProps}/>*/}
                    <IconButton onClick={onClickCallback}><Create color={'secondary'}/></IconButton>
                    </span>
                    : <span onDoubleClick={onDoubleClickCallBack}
                            className={finalClassName}
                            {...restSpanProps}>
                        {  children|| value} <IconButton onClick={onClickCallback}><Create/></IconButton></span>

            }
        </>
    )
}