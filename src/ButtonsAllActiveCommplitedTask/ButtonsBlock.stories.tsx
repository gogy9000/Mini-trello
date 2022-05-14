// Button.stories.ts|tsx

import React, {useState} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ButtonsInToDoWrapper} from "./ButtonsInToDoWrapper";

import {Paper} from "@mui/material";


export default {

    title: 'ButtonBlock',
    component: ButtonsInToDoWrapper,
} as ComponentMeta<typeof ButtonsInToDoWrapper>;


export const ButtonsBlockStories: ComponentStory<typeof ButtonsInToDoWrapper> = () => {
    const [filter, useFilter] = useState<string>('all')

    const useFilterHandler = (filterArg: string) => {
        useFilter(filterArg)
    }
    return <ButtonsInToDoWrapper filterHandler={useFilterHandler} filter={filter}/>
}

export const ButtonsBlockPaperWrapper: ComponentStory<typeof ButtonsInToDoWrapper> = () => {
    const [filter, useFilter] = useState<string>('all')

    const useFilterHandler = (filterArg: string) => {
        useFilter(filterArg)
    }
    return <Paper elevation={12}> <ButtonsInToDoWrapper filterHandler={useFilterHandler} filter={filter}/></Paper>
}
