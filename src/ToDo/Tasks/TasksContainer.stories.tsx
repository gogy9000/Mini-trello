
import {ComponentMeta, ComponentStory} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {ProviderDecorators} from "../../stories/ProviderDecorators";
import {TasksContainer} from "./TasksContainer";




export default {
    title:'Task Container',
    component:TasksContainer,
    decorators:[ProviderDecorators]
} as ComponentMeta<typeof TasksContainer>

 export const Template: ComponentStory<typeof TasksContainer> = (args) => {

    return (
        <TasksContainer  todoId={'123321'} filter={'All'} />
    )
}

