import { v1 } from 'uuid';
import { tasksAllType } from '../AppWithRedux';
import { AddType, RemoveType } from './todolist-reducer';

interface removeTaskType {
    type: 'REMOVE-TASK'
    taskId: string,
    todolistId: string,
}

interface addTaskType {
    type: 'ADD-TASK'
    todolistId: string,
    text: string,
}

interface isDoneTaskType {
    type: 'IS-DONE-TASK'
    taskId: string,
    todolistId: string,
    isDone: boolean
}

interface textChangeTaskType {
    type: 'TEXT-CHANGE-TASK'
    taskId: string,
    todolistId: string,
    text: string
}

type taskActionType = 
removeTaskType | 
addTaskType | 
isDoneTaskType | 
textChangeTaskType | 
AddType | 
RemoveType

const initialState: tasksAllType = {}

export const taskReducer = (state: tasksAllType = initialState, action: taskActionType): tasksAllType => {
    switch(action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            let tasks = state[action.todolistId]
            let remove = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = remove
            return stateCopy
        }
        case 'ADD-TASK': {
            let stateCopy = {...state}
            let tasks = state[action.todolistId]
            let task = {id: v1(), text: action.text, isDone: false}
            let newTasks = [task, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'IS-DONE-TASK': {
            let stateCopy = {...state}
            let tasks = state[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
            task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'TEXT-CHANGE-TASK': {
            let stateCopy = {...state}
            let tasks = state[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
            task.text = action.text
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default: { 
            return state
        }

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskType => {
    return { type: 'REMOVE-TASK', taskId,  todolistId }
}

export const addTaskAC = ( todolistId: string, text: string): addTaskType => {
    return { type: 'ADD-TASK', text, todolistId  }
}

export const isDoneTaskAC = (taskId: string, todolistId: string, isDone: boolean): isDoneTaskType => {
    return { type: 'IS-DONE-TASK', taskId,  todolistId, isDone }
}

export const textChangeTaskAC = (taskId: string, text: string, todolistId: string ): textChangeTaskType => {
    return { type: 'TEXT-CHANGE-TASK', taskId, text, todolistId }
}

export const addTodoListAC = (newTodolistTitle: string): AddType => {
    return { type: 'ADD-TODOLIST', title: newTodolistTitle, todoListId: v1() }
}