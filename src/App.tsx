import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksPropsType} from './Todolist';

function App() {
    //BLL:
    const title: string = 'What to learn';
    /*    const title_2: string='What to buy';*/
const [tasks,setTasks]=useState([
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'JS/ES6', isDone: false},
])
   /* let tasks: Array<TasksPropsType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/ES6', isDone: false},
    ];*/
    /* const tasks_2: Array<TasksPropsType> =[
         {id: 1, title: "Notebook", isDone: true},
         {id: 2, title: "Pen", isDone: false},
         {id: 3, title: "Textbook", isDone: false},
         {id: 4, title: "Eraser", isDone: false}
     ]*/
    const removeTask = (taskID:number) => {
       const updatedTasks=tasks.filter(task=>task.id !==taskID)
       setTasks(updatedTasks);
    };
//UI:
    return (
        <div className="App">
            <Todolist title={title} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
