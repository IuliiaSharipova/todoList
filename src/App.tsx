import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'TS', isDone: false}
        ]
    );
    const [filter, setFilter] = useState<FilterValuesType>('all');


    const removeTask = (taskId: string) => {
        let filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
        console.log(filteredTasks);
    };
    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    };

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    };

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;

