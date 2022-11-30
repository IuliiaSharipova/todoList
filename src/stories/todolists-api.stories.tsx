import React, {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
};
export const GetTodolists = () => {
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

    useEffect(() => {
        todolistAPI.createTodolist('Iuliia\'s todolist')
            .then((res) => {
                setState(res.data);
            });
    },[]);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todoID = '495e9e1a-20f8-44b2-8edb-4968a45acec6';
        todolistAPI.updateTodolist(todoID, 'Updated todolist')
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const deleteTodo = () => {
        const todoID = '495e9e1a-20f8-44b2-8edb-4968a45acec6';
        todolistAPI.deleteTodolist(todoID)
            .then((res) => {
                setState(res.data);
            }).catch(e => console.log(e));
    };
    return (
        <div>
            <button onClick={deleteTodo}>Delete todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    );
};