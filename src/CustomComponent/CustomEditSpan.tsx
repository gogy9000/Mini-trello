import React, {
    ChangeEvent,
    DetailedHTMLProps,
    HTMLAttributes,
    InputHTMLAttributes,

    useState
} from "react";
import {Create} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
type CustomEditSpanPropsType = DefaultInputPropsType & {
    onChangeText?: React.Dispatch<React.SetStateAction<string>>
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
    onClick?: () => void
    setError: React.Dispatch<React.SetStateAction<string>>
    value: string
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
                                                                                 ...restProps
                                                                             }) => {

        const [editMode, setEditMode] = useState<boolean>(false)
        const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

        const onEnterCallBack = (key: string) => {
            if (key !== 'Enter') {
                return
            }
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


            if (!value.trim()) {
                setEditMode(true)
                setError('todo empty')
                return
            }
            setEditMode(false)
            onClick && onClick()
        }

        const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(e)
            onChangeText && onChangeText(e.currentTarget.value)
        }

        const onEditMod = () => {
            setEditMode(true)
        }
        const finalClassName = `${className}`

        return (
            <>
                {
                    editMode
                        ? <span>
                    <TextField
                        error={!!error}
                        onKeyPress={(e) => {
                            onEnterCallBack(e.key)
                        }}
                        onChange={onChangeCallBack}
                        helperText={!!error ? error : false}
                        id="outlined-error"
                        label="update todo"
                        value={value}/>
                        <IconButton onClick={onClickCallback}><Create color={'primary'}/></IconButton>
                    </span>
                        : <span onDoubleClick={onDoubleClickCallBack}
                                className={finalClassName}
                                {...restSpanProps}>
                        {children || value} <IconButton onClick={onEditMod}><Create/></IconButton>
                        </span>

                }
            </>
        )
    }
)
