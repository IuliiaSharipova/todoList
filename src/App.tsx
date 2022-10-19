import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

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
    return (
        <div className="App">
            {todolists.map(todo => {
                let tasksForTodolist = tasks[todo.id];
                if (todo.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (todo.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return (<Todolist key={todo.id}
                                  todoId={todo.id}
                                  title={todo.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  onChangeTaskStatus={onChangeTaskStatus}
                                  filter={todo.filter}
                                  removeTodolist={removeTodolist}
                />);
            })}
        </div>
    );
}

export default App;

