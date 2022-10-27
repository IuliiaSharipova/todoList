import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {EditableSpan} from './components/EditableSpan';
import {Input} from './components/Input';
import {Button,  Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskType} from './AppWithRedux';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

type TodolistWithReduxType = {
    todoId: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithRedux({todoId, title, filter}: TodolistWithReduxType) {
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoId]);
    const dispatch = useDispatch();

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }
    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todoId, 'all'));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todoId, 'active'));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todoId, 'completed'));

    const onRemoveTaskClickHandler = (taskId: string) => dispatch(removeTaskAC(todoId, taskId));

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todoId));
    };

    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(todoId, newTitle));
    };
    const editTodolistHandler = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoId, newTitle));
    };

    const editTaskHandler = (taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, newTitle));
    };
    return (
        <div>
            <h3>
                <EditableSpan title={title} callback={editTodolistHandler}/>
                <IconButton aria-label="delete"
                            onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <Input callback={addTaskHandler}/>
            <ul>
                {tasksForTodolist.map(t => {
                    const onCheckBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(todoId, t.id, newIsDoneValue));
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
                <Button color="secondary"
                        style={{
                            maxWidth: '60px',
                            maxHeight: '25px',
                        }}
                        onClick={onAllClickHandler}
                        variant={filter === 'all' ? 'outlined' : 'text'}>All</Button>
                <Button color="success"
                        style={{
                            maxWidth: '60px',
                            maxHeight: '25px',
                        }}
                        onClick={onActiveClickHandler}
                        variant={filter === 'active' ? 'outlined' : 'text'}>Active
                </Button>
                <Button color="inherit"
                        style={{
                            maxWidth: '100px',
                            maxHeight: '25px',
                        }}
                        onClick={onCompletedClickHandler}
                        variant={filter === 'completed' ? 'outlined' : 'text'}>Completed
                </Button>
            </div>
        </div>
    );

}