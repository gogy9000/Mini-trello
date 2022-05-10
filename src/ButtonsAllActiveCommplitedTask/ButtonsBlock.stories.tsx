// Button.stories.ts|tsx

import React, {useState} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ButtonsBlock} from "./ButtonsBlock";

import {Paper} from "@mui/material";


export default {

    title: 'ButtonBlock',
    component: ButtonsBlock,
} as ComponentMeta<typeof ButtonsBlock>;


export const ButtonsBlockStories: ComponentStory<typeof ButtonsBlock> = () => {
    const [filter, useFilter] = useState<string>('all')

    const useFilterHandler = (filterArg: string) => {
        useFilter(filterArg)
    }
    return <ButtonsBlock filterHandler={useFilterHandler} filter={filter}/>
}

export const ButtonsBlockPaperWrapper: ComponentStory<typeof ButtonsBlock> = () => {
    const [filter, useFilter] = useState<string>('all')

    const useFilterHandler = (filterArg: string) => {
        useFilter(filterArg)
    }
    return <Paper elevation={12}> <ButtonsBlock filterHandler={useFilterHandler} filter={filter}/></Paper>
}
