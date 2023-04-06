import {useAppDispatch, useAppSelector} from '../../app/store';
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from './Todolist/todolists-reducer';
import React, {useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {Input} from '../../components/Input/Input';
import {Todolist} from './Todolist/Todolist';

export const TodolistsList = () => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    const dispatch = useAppDispatch();
    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistTC(newTitle));
    };
    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, []);
    return (<div>
        <Grid container style={{padding: '20px'}}>
            <Input callback={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(todo => {
                return (
                    <Grid item key={todo.id}>
                        <Paper style={{padding: '20px'}}>
                            <Todolist
                                todoId={todo.id}
                                title={todo.title}
                                filter={todo.filter}
                            />
                        </Paper>
                    </Grid>);
            })}
        </Grid>
    </div>);
};