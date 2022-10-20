import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {EditableSpan} from './components/EditableSpan';
import {Input} from './components/Input';

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
    editTodolist: (todoId: string, title: string) => void
    editTask: (todoId: string, taskId: string, title: string) => void
}

export function Todolist(props: TodolistType) {

    const onnAllClickHandler = () => props.changeFilter(props.todoId, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.todoId, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.todoId, 'completed');

    const onRemoveTaskClickHandler = (taskId: string) => props.removeTask(props.todoId, taskId);

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todoId);
    };

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todoId, newTitle);
    };
    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.todoId, newTitle);
    };

    const editTaskHandler = (taskId: string, newTitle: string) => {
        debugger
        props.editTask(props.todoId, taskId, newTitle);
    };
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={editTodolistHandler}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <Input callback={addTaskHandler}/>
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
                            <EditableSpan title={t.title}
                                          callback={(newTitle) => editTaskHandler(t.id, newTitle)}/>
                            <button onClick={() => onRemoveTaskClickHandler(t.id)}>x</button>
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