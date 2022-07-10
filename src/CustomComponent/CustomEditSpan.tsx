import React, {
    ChangeEvent,
    DetailedHTMLProps,
    HTMLAttributes,
    InputHTMLAttributes,
    useState
} from "react";

import {Box, TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";


type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
type CustomEditSpanPropsType = TextFieldProps & {
    onChangeText?: React.Dispatch<React.SetStateAction<string>>
    onEnter?: () => void
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
    onClick?: () => void
    value: string
    editModeControlled?: boolean
    setEditModeControlled?: React.Dispatch<React.SetStateAction<boolean>>
}
export const CustomEditSpan: React.FC<CustomEditSpanPropsType> = React.memo((props) => {

        const {
            onChange, value, error,  onEnter,  spanProps, onChangeText,
            editModeControlled, setEditModeControlled, ...restProps
        } = props

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

        const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            setEditModeControlled ?
                setEditModeControlled(true) :
                setEditMode(true)
            onDoubleClick && onDoubleClick(e)

        }

        const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(e)
            onChangeText && onChangeText(e.currentTarget.value)
        }

        const finalClassName = `${className}`

        return (

            <Box component={"span"} data-testid='Box'>
                {
                    editMode || editModeControlled ?
                        <span>
                            <TextField
                                error={!!error}
                                data-testid='TextField'
                                onKeyPress={(e) => {
                                    onEnterCallBack(e.key)
                                }}
                                onChange={onChangeCallBack}
                                helperText={!!error ? error : false}
                                id="standard-error"
                                multiline
                                fullWidth
                                {...restProps}
                                value={value}/>
                        </span>
                        :
                        <span onDoubleClick={onDoubleClickCallBack}
                              data-testid='span'
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
