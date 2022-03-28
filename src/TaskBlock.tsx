import React from "react";

export const TaskBlock = (props: any) => {
    return (
        <div>
            <ul>
                <li><input type={props.type} checked={props.checked}/> <span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                <li><input type="checkbox" checked={false}/> <span>React</span></li>
            </ul>
        </div>

    )
}