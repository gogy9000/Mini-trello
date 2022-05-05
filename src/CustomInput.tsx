import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type CustomInputPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}
export const CustomInput: React.FC<CustomInputPropsType> = (
    {
        type, onChange, onChangeText, onKeyPress, onEnter,
        error, className, spanClassName, ...restProps
    }
) => {

    const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallBack = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)
        onEnter && e.key === 'Enter' && onEnter()
    }


    return (
        <>
            <input type="text" onChange={onChangeCallBack} onKeyPress={onKeyPressCallBack}
                   {...restProps}/>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </>
    )
}