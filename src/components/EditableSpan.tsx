import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callback: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
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
            ? <input value={newTitle}
                     onBlur={onClickHandler}
                     onChange={onChangeHandler}
                     autoFocus/>
            : <span onDoubleClick={onClickHandler}>{props.title}</span>
    );
};
