import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksPropsType} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    /*    console.log(v1());*/
    //BLL:
    const title: string = 'What to learn';
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/ES6', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>
    (
        'all'
    );
    const addTask = (title: string) => {
        const newTask: TasksPropsType = {
            id: v1(),
            title,
            isDone: false
        };
        setTasks([newTask, ...tasks]);
    };
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    };
    const removeTask = (taskID: string) => {
        /*  const updatedTasks = tasks.filter(task => task.id !== taskID);
          setTasks(updatedTasks);*/
        setTasks(tasks.filter(task => task.id !== taskID));
    };

    let tasksForRender;
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter(t => t.isDone);
            break;
        case 'active':
            tasksForRender = tasks.filter(t => !t.isDone);
            break;
        default:
            tasksForRender = tasks;
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t));
    };
//UI:
    return (
        <div className="App">
            <Todolist title={title}
                      tasks={tasksForRender}
                      filter={filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
