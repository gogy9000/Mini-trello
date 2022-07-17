

import {ProviderDecorators} from "../../stories/ProviderDecorators";
import {InputForAddTask} from "./InputForAddTask";
import {ComponentMeta, ComponentStory} from "@storybook/react";



export default {
    title:'Input for add task',
    component:InputForAddTask,
    decorators:[ProviderDecorators]
} as ComponentMeta<typeof InputForAddTask>

const Template: ComponentStory<typeof InputForAddTask> = (args) => {


    return (
        <InputForAddTask {...args} />
    )
}

export const EmptyTodo = Template.bind({})

EmptyTodo.args = {
todo:{id:"123", title:"todo", addedDate:"string", order:0}
}