import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {tasksReducer, TasksStateType} from './tasks-reducer';
import {TodolistApiType} from '../api/todolists-api';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const newTodolist:TodolistApiType = {title: 'What to buy', id: 'some id',   addedDate: '', order: 0};

    const action = addTodolistAC(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.newTodolist.id);
    expect(idFromTodolists).toBe(action.payload.newTodolist.id);
});
