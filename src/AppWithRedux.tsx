import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from './components/Input';
import BasicAppBar from './components/BasicAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function AppWithRedux() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTask = (todoId: string, taskId: string) => {
        dispatch(removeTaskAC(todoId, taskId));
    };

    const changeFilter = (todoId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoId, value));
    };

    const addTask = (todoId: string, newTitle: string) => {
        dispatch(addTaskAC(todoId, newTitle));
    };
    const onChangeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoId, taskId, isDone));
    };
    const removeTodolist = (todoId: string) => {
        const action = removeTodolistAC(todoId);
        dispatch(action);
    };
    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle);
        dispatch(action);
    };

    const editTask = (todoId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, newTitle));
    };

    const editTodolist = (todoId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoId, newTitle));
    };

    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <Input callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todo => {
                        let tasksForTodolist = tasks[todo.id];
                        if (todo.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                        }
                        if (todo.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                        }

                        return (<Grid item key={todo.id}>
                            <Paper style={{padding: '20px'}}>
                                <Todolist
                                          todoId={todo.id}
                                          title={todo.title}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          onChangeTaskStatus={onChangeTaskStatus}
                                          filter={todo.filter}
                                          removeTodolist={removeTodolist}
                                          editTodolist={editTodolist}
                                          editTask={editTask}
                                />
                            </Paper>
                        </Grid>);
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

