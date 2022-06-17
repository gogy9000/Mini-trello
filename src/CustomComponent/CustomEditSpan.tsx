import React, {
    ChangeEvent,
    DetailedHTMLProps,
    HTMLAttributes,
    InputHTMLAttributes, useEffect,

    useState
} from "react";
import {Create} from "@mui/icons-material";
import {Box, Card, CardContent, IconButton, TextField} from "@mui/material";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
type CustomEditSpanPropsType = DefaultInputPropsType & {
    onChangeText?: React.Dispatch<React.SetStateAction<string>>
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
    onClick?: () => void
    setError?: React.Dispatch<React.SetStateAction<string>>
    value: string
    editModeControlled?: boolean
    setEditModeControlled?: React.Dispatch<React.SetStateAction<boolean>>
}
export const CustomEditSpan: React.FC<CustomEditSpanPropsType> = React.memo(({
                                                                                 onChange,
                                                                                 value,
                                                                                 error,
                                                                                 setError,
                                                                                 autoFocus,
                                                                                 onBlur,
                                                                                 onEnter,
                                                                                 onClick,
                                                                                 spanProps,
                                                                                 onChangeText,
                                                                                 editModeControlled,
                                                                                 setEditModeControlled,
                                                                                 ...restProps
                                                                             }) => {

        const [editMode, setEditMode] = useState<boolean>(false)
        const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}


        const onEnterCallBack = (key: string) => {
            if (key !== 'Enter') {
                return
            }

            setEditModeControlled ?
                setEditModeControlled(false) :
                setEditMode(false)
            onEnter && onEnter()
        }

        const onBlurCallBack = (e: React.FocusEvent<HTMLInputElement>) => {
            setEditModeControlled ?
                setEditModeControlled(false) :
                setEditMode(false)
            onBlur && onBlur(e)
        }

        const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            setEditModeControlled ?
                setEditModeControlled(true) :
                setEditMode(true)
            onDoubleClick && onDoubleClick(e)

        }
        const onClickCallback = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            setEditModeControlled ?
                setEditModeControlled(false) :
                setEditMode(false)
            onClick && onClick(e)
        }

        const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(e)
            onChangeText && onChangeText(e.currentTarget.value)
        }

        const onEditMod = () => {
            setEditModeControlled ?
                setEditModeControlled(true) :
                setEditMode(true)
        }

        const finalClassName = `${className}`


        return (

            <Box component={"span"} data-testId='Box' >
                {
                    editMode || editModeControlled ?
                        <span>
                            <TextField
                                error={!!error}
                                data-testId='TextField'
                                variant={"standard"}
                                onKeyPress={(e) => {
                                    onEnterCallBack(e.key)
                                }}
                                onChange={onChangeCallBack}
                                helperText={!!error ? error : false}
                                id="standard-error"
                                label="update todo"
                                multiline
                                fullWidth
                                value={value}/>
                        </span>
                        :
                        <span onDoubleClick={onDoubleClickCallBack}
                              data-testId='span'
                              className={finalClassName}
                              defaultValue='123'
                              {...restSpanProps}>
                                         {children || value}
                        </span>
                }

            </Box>
        )
    }
)
