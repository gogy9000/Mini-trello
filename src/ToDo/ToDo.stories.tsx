import {ToDo} from "./ToDo";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ProviderDecorators} from "../stories/ProviderDecorators";
import {Provider, useDispatch, useSelector} from "react-redux";

import {AppStateType, store} from "../Redux/ReduxStore";


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
todo:{id: '123', title: 'todo', addedDate: 'string', order: 0, filter: 'All'}
}
