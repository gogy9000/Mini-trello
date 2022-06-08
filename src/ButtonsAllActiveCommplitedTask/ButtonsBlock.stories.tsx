// Button.stories.ts|tsx

import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ButtonsInToDoContainer} from "./ButtonsInToDoContainer";
import {ProviderDecorators} from "../stories/ProviderDecorators";

export default {
    title: 'ButtonBlock',
    component: ButtonsInToDoContainer,
    decorators: [ProviderDecorators]
} as ComponentMeta<typeof ButtonsInToDoContainer>;

const Template: ComponentStory<typeof ButtonsInToDoContainer> = (args) => <ButtonsInToDoContainer  {...args}/>

export const All = Template.bind({})
All.args = {
    todoId: '123',
    filter: 'All'
}

export const Active = Template.bind({})
Active.args = {
    todoId: '123',
    filter: 'Active'
}

export const Completed = Template.bind({})
Completed.args = {
    todoId: '123',
    filter: 'Completed'
}


