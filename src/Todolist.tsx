import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

import {FilterValuesType} from './App';
import {Button} from './components/Button';

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('');
    const [error,setError]=useState<boolean>(false)
    const taskListItem = props.tasks.length
        ? props.tasks.map(task => {
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked);
            return (

                <li className={task.isDone ? 'isDone' : ''}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>

            )
                ;
        }) : <span>Your tasks list is empty</span>;

    const addTask = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTask(title);
        } else {
            setError(true)
        }
        setTitle('');
    };

    const getChangeFilterHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter);
    };
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            addTask();
        }
    };
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value);
    };
    const tsarClickHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue);
    };
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? 'error' :''}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color:'hotpink'}}>Title is required!</div>}
            </div>
            <ul>
                {taskListItem}
            </ul>
            <div>
                <Button classes={props.filter === 'all' ? 'active' : ''} name={'All'}
                        callBack={() => tsarClickHandler('all')}/>
                <Button classes={props.filter === 'active' ? 'active' : ''} name={'Active'}
                        callBack={() => tsarClickHandler('active')}/>
                <Button classes={props.filter === 'completed' ? 'active' : ''} name={'Completed'}
                        callBack={() => tsarClickHandler('completed')}/>

            </div>
        </div>
    );
};

export default Todolist;