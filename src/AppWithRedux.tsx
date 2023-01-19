import React from 'react';
import './App.css';
import {Input} from './components/Input';
import BasicAppBar from './components/BasicAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC, TodolistDomainType} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithRedux} from './TodolistWithRedux';
import {TaskType} from './api/todolists-api';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const dispatch = useDispatch();

    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle);
        dispatch(action);
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

                        return (
                            <Grid item key={todo.id}>
                            <Paper style={{padding: '20px'}}>
                                <TodolistWithRedux
                                    todoId={todo.id}
                                    title={todo.title}
                                    filter={todo.filter}
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

