import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {EditableSpan} from './components/EditableSpan';
import {Input} from './components/Input';
import {Button, ButtonGroup, Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


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
                <IconButton aria-label="delete"
                            onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
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
                            <Checkbox color="secondary"
                                      checked={t.isDone} onChange={onCheckBoxChangeHandler}
                            />
                            <EditableSpan title={t.title}
                                          callback={(newTitle) => editTaskHandler(t.id, newTitle)}/>
                            <IconButton aria-label="delete"
                                        size="small"
                                        onClick={() => onRemoveTaskClickHandler(t.id)}>
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        </li>
                    );
                })}
            </ul>
            <div>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button color="secondary"
                            style={{
                                maxWidth: '60px',
                                maxHeight: '25px',
                            }}
                            onClick={onnAllClickHandler}
                            className={props.filter === 'all' ? 'active-filter' : ''}>All</Button>
                    <Button color="success"
                            style={{
                                maxWidth: '60px',
                                maxHeight: '25px',
                            }}
                            onClick={onActiveClickHandler}
                            className={props.filter === 'active' ? 'active-filter' : ''}>Active
                    </Button>
                    <Button color="inherit"
                            style={{
                                maxWidth: '100px',
                                maxHeight: '25px',
                            }}
                            onClick={onCompletedClickHandler}
                            className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );

}