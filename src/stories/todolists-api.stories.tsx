import React, {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API/Todolists'
};
export const GetTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => { // place for creating request
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            });

    }, []);
    // response will be placed in div as string
    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistTitle, setTodolistTitle] = useState<string>('');

    const createTodolist = () => {
        todolistAPI.createTodolist(todolistTitle)
            .then((res) => {
                setState(res.data);
            }).catch(e => console.log(e));
    };
    return (
        <div>
            <input placeholder={'todolistTitle'}
                   value={todolistTitle}
                   onChange={(e) => {
                       setTodolistTitle(e.currentTarget.value);
                   }}/>
            <button onClick={createTodolist}>Create todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    );
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [todolistTitle, setTodolistTitle] = useState<string>('');

    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, todolistTitle)
            .then((res) => {
                setState(res.data);
            }).catch(e => console.log(e));
    };
    return (
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value);
                   }}/>
            <input placeholder={'todolistTitle'}
                   value={todolistTitle}
                   onChange={(e) => {
                       setTodolistTitle(e.currentTarget.value);
                   }}/>
            <button onClick={updateTodolist}>Update todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    );
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            }).catch(e => console.log(e));
    };
    return (
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value);
                   }}/>
            <button onClick={deleteTodolist}>Delete todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    );
};