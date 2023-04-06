import App from './App';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Todolist Components/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App/>;

export const AppStory = Template.bind({});
AppStory.args = {};