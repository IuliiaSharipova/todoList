import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Input} from '../components/Input';
import {action} from '@storybook/addon-actions';
import {Button, TextField} from '@mui/material';

export default {
    title: 'Todolist Components/Input',
    component: Input,
    argTypes: {
        callback: {description: 'Button clicked inside form'},
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputStory = Template.bind({});
InputStory.args = {
    callback: action('Button clicked inside form')
};

const TemplateWithError: ComponentStory<typeof Input> = (args) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>('Title is required');

    const addItemHandler = () => {
        if (title.trim() !== '') {
            args.callback(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItemHandler();
        }
    };

    return (
        <div>

            <div>
                <TextField id="outlined-basic"
                           label={error ? '' : 'Title'}
                           variant="outlined"
                           size="small"
                           value={title}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}
                           error={!!error}
                           helperText={error}
                />
                <Button color="secondary"
                        style={{
                            maxWidth: '30px',
                            maxHeight: '30px',
                            minWidth: '30px',
                            minHeight: '30px',
                            backgroundColor: 'darkgrey'
                        }}
                        onClick={addItemHandler}
                >+</Button>
            </div>
        </div>
    );
};
export const InputWithErrStory = TemplateWithError.bind({});
InputWithErrStory.args = {
    callback: action('Button clicked inside form')
};
