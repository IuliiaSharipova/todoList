import {TodolistApiType, todolistsApi} from '../../../api/todolists-api';
import {Dispatch} from 'redux';

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
      {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
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

//actions
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {todolistId}}) as const;
export const addTodolistAC = (newTodolist: TodolistApiType) =>
    ({type: 'ADD-TODOLIST',payload: {newTodolist}}) as const;
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, newTodolistTitle}}) as const;
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, newFilter}}) as const;
export const setTodolistsAC = (todolists: Array<TodolistApiType>) =>({type: 'SET-TODOLISTS',todolists}) as const;

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsApi.getTodolist().then((res) => {
        dispatch(setTodolistsAC(res.data));
    });
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsApi.createTodolist(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item));
    });
};
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsApi.updateTodolist(todolistId, newTitle).then((res) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    });
};
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsApi.deleteTodolist(todolistId).then((res) => {
        dispatch(removeTodolistAC(todolistId));
    });
};

// types
export type TodolistsActionsType =
    | removeTodolistType
    | addTodolistType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | setTodolistsType

export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type addTodolistType = ReturnType<typeof addTodolistAC>
export type setTodolistsType = ReturnType<typeof setTodolistsAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
}
