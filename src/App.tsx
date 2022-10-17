import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
            {id: 4, title: 'Rest API', isDone: false},
            {id: 5, title: 'TS', isDone: false}
        ]
    );
    const [filter, setFilter] = useState<FilterValuesType>('all');


    const removeTask = (taskId: number) => {
        let filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
    };
    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    const changeFilter=(value:FilterValuesType)=>{
        setFilter(value)
    }
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

