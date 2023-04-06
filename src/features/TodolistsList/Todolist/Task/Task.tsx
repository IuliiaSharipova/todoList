import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeTaskTC, updateTaskTC} from './tasks-reducer';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {useAppDispatch} from '../../../../app/store';

type TaskPropsType = {
    task: TaskType
    todoId: string
}
export const Task = memo(({task, todoId}: TaskPropsType) => {
    const dispatch = useAppDispatch();
    const onCheckBoxChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(updateTaskTC(todoId, task.id, newIsDoneValue
            ? {status:TaskStatuses.Completed}
            : {status:TaskStatuses.New}));
    },[dispatch]);
    const onRemoveTaskClickHandler = useCallback((taskId: string) => dispatch(removeTaskTC(todoId, taskId)),[dispatch]);
    const editTaskHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todoId, taskId, {title:newTitle}));
    }, [dispatch]);

    return (
        <div>
            <Checkbox color="secondary"
                      checked={task.status === TaskStatuses.Completed}
                      onChange={onCheckBoxChangeHandler}
            />
            <EditableSpan title={task.title}
                          callback={useCallback((newTitle) => editTaskHandler(task.id, newTitle), [task.id])}/>
            <IconButton aria-label="delete"
                        size="small"
                        onClick={() => onRemoveTaskClickHandler(task.id)}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    );
});
