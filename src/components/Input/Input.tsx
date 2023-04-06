import React, {ChangeEvent, KeyboardEvent,  useState} from 'react';
import {Button, TextField} from '@mui/material';

type InputType = {
    callback: (title: string) => void
}
export const Input = React.memo((props: InputType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.callback(title.trim());
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
            setError('');
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
});
