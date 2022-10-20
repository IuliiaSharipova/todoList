import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from './components/Input';
import BasicAppBar from './components/BasicAppBar';
import {Container, Grid, Paper} from '@mui/material';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
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

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();


    const [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    );
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    });

    const removeTask = (todoId: string, taskId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(task => task.id !== taskId)});
    };

    const changeFilter = (todoId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(todo =>
            todo.id === todoId ? {...todo, filter: value} : todo));
    };

    const addTask = (todoId: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false};
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]});
    };
    const onChangeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        });
    };
    const removeTodolist = (todoId: string) => {
        setTodolists(todolists.filter(todo => todo.id !== todoId));
        delete tasks[todoId];
    };
    const addTodolist = (newTitle: string) => {
        const newTodolistID = v1();
        const newTodolist: TodolistsType = {id: newTodolistID, title: newTitle, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistID]: []});
    };

    const editTask = (todoId: string, taskId: string, newTitle: string) => {
        debugger
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
        });
    };

    const editTodolist = (todoId: string, newTitle: string) => {
        setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, title: newTitle} : todo));
    };

    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
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

                    return (<Grid item>
                        <Paper style={{padding: '20px'}}>
                            <Todolist key={todo.id}
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

export default App;

