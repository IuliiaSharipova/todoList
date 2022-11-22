import {EditableSpan} from './EditableSpan';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Todolist Components/Editable span',
    component: EditableSpan,
    //Default values for props
    args: {
        title: 'Title',
        callback: action('You try to rewrite title to')
    },
    //Descriptions for Docs
    argTypes: {
        callback: {
            description: 'Work when button inside form clicked'
        },
        title: {
            description: 'Title of task or todolist, can be changed',
            defaultValue: 'Title'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {};

export const EditableSpanStoryWithChangedProps = Template.bind({});

EditableSpanStoryWithChangedProps.args = {
    callback: action('Name changed'),
    title: 'Story 2'
};