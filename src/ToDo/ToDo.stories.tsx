import {ToDo} from "./ToDo";
import { ProviderDecorators} from "../stories/ProviderDecorators";
import {Provider, useDispatch, useSelector} from "react-redux";

import {AppRootStateType, store} from "../Redux/ReduxStore";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    title: 'todo',
    component: ToDo,
    decorators:[ProviderDecorators]

} as ComponentMeta<typeof ToDo>

const Template: ComponentStory<typeof ToDo> = (args) => {


    return (
            <ToDo {...args} />
    )
}

export const EmptyTodo = Template.bind({})

EmptyTodo.args = {
todo:{id: '123321', title: 'todo', addedDate: 'string', order: 0, filter: 'All'}
}
