import {TodolistApiType, todolistsApi, UpdateTaskModelType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

type ActionType =
    removeTodolistType
    | addTodolistType
    | changeTodolistTitleType
    | changeTodolistFilterType
    | setTodolistsType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
   {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.payload.todolistId);
        case 'ADD-TODOLIST':
            return [{...action.payload.newTodolist, filter: 'all'}, ...state,];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.payload.todolistId ? {
                ...todo,
                title: action.payload.newTodolistTitle
            } : todo);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.payload.todolistId ? {
                ...todo,
                filter: action.payload.newFilter
            } : todo);
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}));
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
export const addTodolistAC = (newTodolist: TodolistApiType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolist},
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

export type setTodolistsType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: Array<TodolistApiType>) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const;
};

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodolist().then((res) => {
        dispatch(setTodolistsAC(res.data));
    });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item));
    });
};

export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistsApi.updateTodolist(todolistId, newTitle).then((res) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTodolist(todolistId).then((res) => {
        dispatch(removeTodolistAC(todolistId));
    });
};