import {v1} from 'uuid';
import {addTodolistType, removeTodolistType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolists-api';


type ActionType =
    removeTaskType
    | addTaskType
    | changeTaskStatusType
    | changeTaskTitleType
    | removeTodolistType
    | addTodolistType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            };
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.newTaskTitle,
                status: TaskStatuses.New,
                startDate: '',
                priority: TaskPriorities.Low,
                description: '',
                deadline: '',
                todoListId: action.payload.todolistId,
                addedDate: '',
                order: 0
            };
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]};
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    status: action.payload.newStatus
                } : task)
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.newTaskTitle
                } : task)
            };
        case 'REMOVE-TODOLIST':
            const {[action.payload.todolistId]: [], ...rest} = {...state};
            return rest;
        /* let copyState = {...state};
         delete copyState[action.payload.todolistId];
         return copyState;
*/
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []};
        default:
            return state;
    }
};

type removeTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId}
    } as const;
};

type addTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, newTaskTitle}
    } as const;
};

type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, newStatus: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todolistId, taskId, newStatus}
    } as const;
};
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todolistId, taskId, newTaskTitle}
    } as const;
};