// Button.stories.ts|tsx

import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ButtonsInToDoWrapper} from "./ButtonsInToDoWrapper";

import {Paper} from "@mui/material";


export default {

    title: 'ButtonBlock',
    component: ButtonsInToDoWrapper,
} as ComponentMeta<typeof ButtonsInToDoWrapper>;


export const ButtonsBlockStories: ComponentStory<typeof ButtonsInToDoWrapper> = () => {




    return <ButtonsInToDoWrapper todoId={'123'}  filter={'all'}/>
}

export const ButtonsBlockPaperWrapper: ComponentStory<typeof ButtonsInToDoWrapper> = () => {


    return <Paper elevation={12}> <ButtonsInToDoWrapper  todoId={'123'} filter={'all'}/></Paper>
}
