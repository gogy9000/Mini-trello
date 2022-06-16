import {TodoTitle} from "./TodoTitle";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ProviderDecorators} from "../../stories/ProviderDecorators";



export default {
    title:'Title todo',
    component:TodoTitle,
    decorators:[ProviderDecorators]
} as ComponentMeta<typeof TodoTitle>

const Template: ComponentStory<typeof TodoTitle> = (args) => {


    return (
        <TodoTitle {...args} />
    )
}

export const EmptyTodo = Template.bind({})

EmptyTodo.args = {
    todo:{id: '123', title: 'todo azaza', addedDate: 'string', order: 0, filter: 'All'}
}