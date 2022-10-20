import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputType = {
    callback: (title: string) => void
}
export const Input = (props: InputType) => {
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
        setError('');
        if (e.key === 'Enter') {
            addItemHandler();
        }
    };
    return (
        <div>

            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addItemHandler}>+</button>
                {error &&
                    <div className={'error-message'}>{error}</div>}
            </div>
        </div>
    );
};
