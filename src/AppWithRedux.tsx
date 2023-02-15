import React, {useEffect} from 'react';
import './App.css';
import {Input} from './components/Input';
import BasicAppBar from './components/BasicAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC, addTodolistTC, fetchTodolistsTC, TodolistDomainType} from './state/todolists-reducer';
import {useAppDispatch, useAppSelector} from './state/store';
import {TodolistWithRedux} from './TodolistWithRedux';
import {TaskType} from './api/todolists-api';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, []);

    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistTC(newTitle));
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

