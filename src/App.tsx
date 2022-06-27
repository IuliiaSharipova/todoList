import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksPropsType} from './Todolist';

function App() {
    //BLL:
    const title: string = 'What to learn';
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/ES6', isDone: false},
    ]);


    const removeTask = (taskID: number) => {
        /*  const updatedTasks = tasks.filter(task => task.id !== taskID);
          setTasks(updatedTasks);*/
        setTasks(tasks.filter(task => task.id !== taskID));
    };
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>
    (
        'completed'
    );

    let tasksForRender
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter(t => t.isDone)
            break
        case 'active':
            tasksForRender = tasks.filter(t => !t.isDone)
            break
        default:
            tasksForRender = tasks;
    }

//UI:
    return (
        <div className="App">
            <Todolist title={title} tasks={tasksForRender} removeTask={removeTask}/>
        </div>
    );
}

export default App;
