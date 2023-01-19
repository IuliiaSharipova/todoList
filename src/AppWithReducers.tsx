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
    FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {TaskPriorities, TaskStatuses} from './api/todolists-api';


function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
            {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
            {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
        ]
    );
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''

            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatuses.New,
                todoListId: todolistID1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },

        ],
        [todolistID2]: [
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.Completed, todoListId: todolistID2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.New,
                todoListId: todolistID2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
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
    const onChangeTaskStatus = (todoId: string, taskId: string, status: TaskStatuses) => {
        dispatchToTasks(changeTaskStatusAC(todoId, taskId, status));
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
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
                        }
                        if (todo.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
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

