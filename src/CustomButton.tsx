import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";

type DefaultButtonsPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type CustomButtonPropsType = DefaultButtonsPropsType & {


    red?:boolean
}
export const CustomButton: FC<CustomButtonPropsType> = (
    {
         className,red, ...restProps
    }) => {

   const finalClassName= `${red && red} ${className}`

    return (
        <button className={finalClassName}
                {...restProps}/>
    )

}