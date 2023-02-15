import {addTodolistType, removeTodolistType, setTodolistsType} from './todolists-reducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType, TodolistApiType,
    todolistsApi,
    UpdateTaskModelType
} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';


type ActionType =
    removeTaskType
    | addTaskType
    | updateTaskType
    | removeTodolistType
    | addTodolistType
    | setTodolistsType
    | setTasksType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {
    /*"todolistId1": [
       { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ],
   "todolistId2": [
       { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ]*/
};

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [action.payload.newTask, ...state[action.payload.todolistId]]
            };
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, ...action.payload.model}
                    : task)
            };
        case 'REMOVE-TODOLIST':
            const {[action.payload.todolistId]: [], ...rest} = {...state};
            return rest;
        /* let copyState = {...state};
         delete copyState[action.payload.todolistId];
         return copyState;
*/
        case 'ADD-TODOLIST':
            return {...state, [action.payload.newTodolist.id]: []};

        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach((tl: TodolistApiType) => {
                stateCopy[tl.id] = [];
            });
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks};

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
export const addTaskAC = (todolistId: string, newTask: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, newTask}
    } as const;
};

type updateTaskType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {todolistId, taskId, model}
    } as const;
};

export type setTasksType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId
    } as const;
};
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId));
        });
};

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todolistId, taskId).then((res) => {
        dispatch(removeTaskAC(todolistId, taskId));
    });
};

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTask(todolistId, title).then((res) => {
        dispatch(addTaskAC(todolistId, res.data.data.item));
    });
};

export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId);
    if (task) {
        const ApiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        };
        todolistsApi.updateTask(todolistId, taskId, ApiModel).then((res) => {
            dispatch(updateTaskAC(todolistId, taskId, res.data.data.item));
        });

    } else {
        console.warn('Task not found in the state');
    }
};