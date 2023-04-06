import axios, {AxiosResponse} from 'axios';

// api
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1dda7b3e-e372-45e9-b764-953ac45ae692',
    },
});

export const todolistsApi = {
    getTodolist() {
        return instance.get<Array<TodolistApiType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<'', AxiosResponse<ResponseType<{ item: TodolistApiType }>>, { title: string }>('todo-lists', {title: title});
    }, //types expanded on payload
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<TodolistApiType>>(
            `todo-lists/${todolistId}`,
            {title: title}
        );
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{item:TaskType}>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            model
        );
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
};

// types
export type TodolistApiType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
