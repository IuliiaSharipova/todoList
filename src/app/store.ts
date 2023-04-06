import {TasksActionsType, tasksReducer} from '../features/TodolistsList/Todolist/Task/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});
// create store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// all actions type
export type AppActionsType = TodolistsActionsType | TasksActionsType

type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AppActionsType>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();

// чтобы не указывать при вынимании части стейта тип всего стейта
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof rootReducer>

// to use store from browser console
// @ts-ignore
window.store = store;
