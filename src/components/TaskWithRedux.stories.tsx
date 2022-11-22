import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {TaskWithRedux} from '../components/TaskWithRedux';
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Todolist Components/Task',
    component: TaskWithRedux,
    decorators:[ReduxStoreProviderDecorator],
    args:{
        task: {id: '1', isDone: true, title: 'JS'},
        todoId: 'todolistId1',
    }
} as ComponentMeta<typeof TaskWithRedux>;


const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {id: '1', isDone: false, title: 'JS'},//redefined the value for a specific story
};
