import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../AppWithRedux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
    task: TaskType
    todoId: string
}
export const TaskWithRedux = memo(({task, todoId}: TaskPropsType) => {
    console.log('task');
    const dispatch = useDispatch();

    const onCheckBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todoId, task.id, newIsDoneValue));
    };
    const onRemoveTaskClickHandler = (taskId: string) => dispatch(removeTaskAC(todoId, taskId));

    const editTaskHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, newTitle));
    }, [dispatch]);
    return (
        <div>
            <Checkbox color="secondary"
                      checked={task.isDone} onChange={onCheckBoxChangeHandler}
            />
            <EditableSpan title={task.title}
                          callback={useCallback((newTitle) => editTaskHandler(task.id, newTitle),[task.id])}/>
            <IconButton aria-label="delete"
                        size="small"
                        onClick={() => onRemoveTaskClickHandler(task.id)}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    );
});