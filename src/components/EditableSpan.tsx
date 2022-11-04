import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanType = {
    title: string
    callback: (newTitle: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanType) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(props.title);

    const onClickHandler = () => {
        setEdit(!edit);
        props.callback(newTitle);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };

    return (
        edit
            ? <TextField
                value={newTitle}
                onBlur={onClickHandler}
                onChange={onChangeHandler}
                autoFocus
                id="standard-basic"
                label= 'Title'
                variant="standard"/>
            : <span onDoubleClick={onClickHandler}>{props.title}</span>
    );
});
