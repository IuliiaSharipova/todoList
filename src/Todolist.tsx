import React from 'react';

export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: () => void
}

const Todolist = (props: TodolistPropsType) => {
    const taskListItem = props.tasks.map(task => {
        return (
            <li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>
        );
    });
    return (
        <div>
            {/*Header*/}
            {/*Title*/}
            <h3>{props.title}</h3>
            {/*Input form*/}
            <div>
                <input/>
                <button>+</button>
            </div>
            {/*Tasks list*/}
            <ul>
                {taskListItem}
                {/*Task
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            {/*Buttons block*/}
            <div>
                {/*Button*/}
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;