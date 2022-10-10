
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ProviderDecorators} from "../../stories/ProviderDecorators";
import {InputForAddTask} from "./InputForAddTask";



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
todo:{_id:"123", title:"todo", addedDate:"string", order:0}
}