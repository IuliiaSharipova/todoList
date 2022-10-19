import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoId: string, taskId: string) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    addTask: (todoId: string, newTitle: string) => void
    onChangeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todoId: string
    removeTodolist: (todoId: string) => void
}

export function Todolist(props: TodolistType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todoId, title.trim());
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
            addTaskHandler();
        }
    };
    const onnAllClickHandler = () => props.changeFilter(props.todoId, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.todoId, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.todoId, 'completed');
    const onnAddTaskClickHandler = (taskId: string) => props.removeTask(props.todoId, taskId);

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todoId);
    };
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error &&
                    <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onCheckBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.onChangeTaskStatus(props.todoId, t.id, newIsDoneValue);
                    };
                    return (
                        <li key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onCheckBoxChangeHandler}
                                   className={t.isDone ? 'is-done' : ''}
                            />
                            <span>{t.title}</span>
                            <button onClick={() => onnAddTaskClickHandler(t.id)}>x</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={onnAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );

}