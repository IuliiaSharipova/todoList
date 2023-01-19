import React, {useEffect, useState} from 'react';
import {todolistsApi} from '../api/todolists-api';

export default {
    title: 'API/Tasks'
};
export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => { // place for creating request
        const todolistId = '644b896a-ce7d-4159-8363-610bd47d210b';
        todolistsApi.getTask(todolistId)
            .then((res) => {
                setState(res.data);
            });

    }, []);
    // response will be placed in div as string
    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const createTask = () => {
        todolistsApi.createTask(todolistId, taskTitle)
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
            <input placeholder={'taskTitle'}
                   value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value);
                   }}/>
            <button onClick={createTask}>Create task</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    );
};

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');

    const updateTask = () => {
        todolistsApi.updateTask(todolistId, taskId, {
            description: description,
            title: title,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline
        })
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
            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value);
                   }}/>
            <input placeholder={'description'}
                   value={description}
                   onChange={(e) => {
                       setDescription(e.currentTarget.value);
                   }}/>
            <input placeholder={'status'}
                   value={status}
                   type={'number'}
                   onChange={(e) => {
                       setStatus(+e.currentTarget.value);
                   }}/>
            <input placeholder={'title'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value);
                   }}/>
            <input placeholder={'priority'}
                   value={priority}
                   type={'number'}
                   onChange={(e) => {
                       setPriority(+e.currentTarget.value);
                   }}/>
            <input placeholder={'startDate'}
                   value={startDate}
                   onChange={(e) => {
                       setStartDate(e.currentTarget.value);
                   }}/>
            <input placeholder={'deadline'}
                   value={deadline}
                   onChange={(e) => {
                       setDeadline(e.currentTarget.value);
                   }}/>
            <button onClick={updateTask}>Update task</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    );
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');
    const deleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId)
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
            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value);
                   }}/>
            <button onClick={deleteTask}>Delete task</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    );
};
