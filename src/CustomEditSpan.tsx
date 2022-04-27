import React, {DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState} from "react";
import {CustomInput} from "./CustomInput";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
type CustomEditSpanPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
}
export const CustomEditSpan: React.FC<CustomEditSpanPropsType> = (
    {
        autoFocus, onBlur, onEnter,
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
    const finalClassName = `${className}`

    return (
        <>
            {
                editMode
                    ? <CustomInput

                        autoFocus
                        onBlur={onBlurCallBack}
                        onEnter={onEnterCallBack}
                        onChangeText={onChangeText}
                        {...restProps}/>

                    : <span onDoubleClick={onDoubleClickCallBack}
                            className={finalClassName}
                            {...restSpanProps}>
                        {  children|| restProps.value}
                    </span>

            }
        </>
    )
}