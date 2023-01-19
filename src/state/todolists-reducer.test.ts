import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ];
});

test('correct todolist should be removed', () => {

    /*const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})*/
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';

    /*  const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})*/
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist';


    /* const action = {
         type: 'CHANGE-TODOLIST-TITLE',
         id: todolistId2,
         title: newTodolistTitle
     }

     const endState = todolistsReducer(startState, action)*/

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed';


    /*const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action)*/
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
