import React, {memo, useCallback, useEffect} from 'react';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Input} from '../../../components/Input/Input';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC
} from './todolists-reducer';
import {addTaskTC, fetchTasksTC} from './Task/tasks-reducer';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';


type TodolistWithReduxType = {
    todoId: string
    title: string
    filter: FilterValuesType
}

export const Todolist = memo(({todoId, title, filter}: TodolistWithReduxType) => {
    let tasks = useAppSelector<Array<TaskType>>(state => state.tasks[todoId]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(todoId));
    }, []);

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todoId, 'all')), [dispatch]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todoId, 'active')), [dispatch]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todoId, 'completed')), [dispatch]);

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(todoId));
    };
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskTC(todoId, newTitle));
    }, [dispatch]);
    const editTodolistHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleTC(todoId, newTitle));
    }, [dispatch]);

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
                    return <Task key={t.id}
                                 task={t}
                                 todoId={todoId}/>;
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

});