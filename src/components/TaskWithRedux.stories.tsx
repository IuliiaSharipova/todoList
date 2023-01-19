import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {TaskWithRedux} from '../components/TaskWithRedux';
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

export default {
    title: 'Todolist Components/Task',
    component: TaskWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    args: {
        task: {
            id: '1',
            status: TaskStatuses.Completed, title: 'JS',
            todoListId: 'todolistId1',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        },
        todoId: 'todolistId1',
    }
} as ComponentMeta<typeof TaskWithRedux>;


const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {
        id: '1',
        status: TaskStatuses.New,
        title: 'JS',
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
    },//redefined the value for a specific story
};
