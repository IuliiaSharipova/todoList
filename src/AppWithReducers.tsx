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

function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    );
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(todoId, taskId));
    };

    const changeFilter = (todoId: string, value: FilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterAC(todoId, value));
    };

    const addTask = (todoId: string, newTitle: string) => {
        dispatchToTasks(addTaskAC(todoId, newTitle));
    };
    const onChangeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todoId, taskId, isDone));
    };
    const removeTodolist = (todoId: string) => {
        const action = removeTodolistAC(todoId);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    };
    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    };

    const editTask = (todoId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todoId, taskId, newTitle));
    };

    const editTodolist = (todoId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todoId, newTitle));
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

export default AppWithReducers;

