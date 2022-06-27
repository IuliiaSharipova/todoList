import React from 'react';
import {FilterValuesType} from './App';

export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskID: number) => void
    changeFilter:(filter:FilterValuesType)=> void
}

const Todolist = (props: TodolistPropsType) => {
    const taskListItem = props.tasks.map(task => {
        return (

            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>

        )
            ;
    });
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskListItem}
            </ul>
            <div>
                {/*Button*/}
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;