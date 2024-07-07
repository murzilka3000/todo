import { tasksAllType } from '../App';

interface removeTaskType {
    type: 'REMOVE-TASK'
    taskId: string,
    todolistId: string,
}

type taskActionType = removeTaskType

export const taskReducer = (state: tasksAllType, action: taskActionType): tasksAllType => {
    switch(action.type) {
        case 'REMOVE-TASK': {
            return {...state}
        }

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskType => {
    return { type: 'REMOVE-TASK', taskId,  todolistId }
}