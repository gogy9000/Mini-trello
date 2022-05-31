// Button.stories.ts|tsx

import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ButtonsInToDoContainer} from "./ButtonsInToDoContainer";

import {Paper} from "@mui/material";


export default {

    title: 'ButtonBlock',
    component: ButtonsInToDoContainer,
} as ComponentMeta<typeof ButtonsInToDoContainer>;


export const ButtonsBlockStories: ComponentStory<typeof ButtonsInToDoContainer> = () => {




    return <ButtonsInToDoContainer todoId={'123'} filter={'all'}/>
}

export const ButtonsBlockPaperWrapper: ComponentStory<typeof ButtonsInToDoContainer> = () => {


    return <Paper elevation={12}> <ButtonsInToDoContainer todoId={'123'} filter={'all'}/></Paper>
}
