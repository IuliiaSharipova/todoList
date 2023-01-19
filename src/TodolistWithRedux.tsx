import React, {memo, useCallback} from 'react';
import {EditableSpan} from './components/EditableSpan';
import {Input} from './components/Input';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC} from './state/tasks-reducer';
import {TaskWithRedux} from './components/TaskWithRedux';
import {TaskStatuses, TaskType} from './api/todolists-api';


type TodolistWithReduxType = {
    todoId: string
    title: string
    filter: FilterValuesType
}

export const TodolistWithRedux = memo(({todoId, title, filter}: TodolistWithReduxType) => {
    console.log('Todolist');
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoId]);
    const dispatch = useDispatch();
    console.log(tasks);
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
        dispatch(removeTodolistAC(todoId));
    };

    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskAC(todoId, newTitle));
    }, [dispatch]);

    const editTodolistHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoId, newTitle));
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
                    return <TaskWithRedux key={t.id}
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