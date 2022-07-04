import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

import {FilterValuesType} from './App';

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('');
    const taskListItem = props.tasks.length
        ? props.tasks.map(task => {
            return (

                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>

            )
                ;
        }) : <span>Your tasks list is empty</span>;
    const addTask = () => {
        props.addTask(title);
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
    const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {taskListItem}
            </ul>
            <div>
                {/*Button*/}
                <button onClick={getChangeFilterHandler('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;