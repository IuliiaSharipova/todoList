import {Provider} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todolistsReducer} from '../../state/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});
const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        ['todolistId2']: [
            {id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''},
            {id: v1(),
                title: 'React Book',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
