import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';


type ActionType = removeTodolistType | addTodolistType | changeTodolistTitleType|changeTodolistFilterType

const initialState:Array < TodolistType >=[]

export const todolistsReducer = (state: Array<TodolistType>=initialState, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.payload.todolistId);
        case 'ADD-TODOLIST':
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: 'all'};
            return [...state, newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo=>todo.id===action.payload.todolistId ? {...todo, title:action.payload.newTodolistTitle} :todo)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo=>todo.id===action.payload.todolistId ? {...todo, filter:action.payload.newFilter} :todo)
        default:
            return state;
    }
};

export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload:
            {todolistId}
    } as const;
};

export type addTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle,todolistId:v1()},
    } as const;
};

export type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId, newTodolistTitle}
    } as const;
};
export type changeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId, newFilter}
    } as const;
};