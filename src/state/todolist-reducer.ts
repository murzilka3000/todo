import { v1 } from "uuid"
import { filterType, todoListsType } from "../App"

export interface RemoveType {
    type: 'REMOVE-TODOLIST',
    id: string
}

export interface AddType {
    type: 'ADD-TODOLIST',
    title: string,
    todoListId: string
}

export interface TitleType {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export interface FilterType {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: filterType
}

export type ActionType = RemoveType | AddType | TitleType | FilterType

export const todolistReducer = (state: todoListsType[], action: ActionType): todoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, { id: action.todoListId, filter: 'all', title: action.title }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
                const todoList = state.find(tl => tl.id === action.id)
                if (todoList) {
                    todoList.title = action.title
                }
                return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
                if (todoList) {
                    todoList.filter = action.filter
                }
                return [...state]
        }
        default: { 
            return [...state]
        }
    }
}

export const removeTodoListAC = (todolistId: string): RemoveType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodoListAC = (newTodolistTitle: string): AddType => {
    return { type: 'ADD-TODOLIST', title: newTodolistTitle, todoListId: v1() }
}

export const titleTodoListAC = (newTodolistTitle: string, todolistId: string): TitleType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: newTodolistTitle, id: todolistId }
}

export const filterTodoListAC = (newFilter: filterType, todolistId: string): FilterType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: newFilter, id: todolistId }
}