import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1dda7b3e-e372-45e9-b764-953ac45ae692',
    },
});

type TodolistType = {
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

type TaskType = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
type UpdateTaskModelType = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}
export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title}
        );
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTask(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title});
    },
     updateTask(todolistId: string, taskId: string, model:UpdateTaskModelType) {
         return instance.put<ResponseType>(
             `todo-lists/${todolistId}/tasks/${taskId}`,
             {...model}
         );
     },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
};
