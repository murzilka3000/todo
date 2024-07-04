import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { filterType } from "../App";
import { v1 } from "uuid";

interface TodoList {
    id: string,
    title: string,
    filter: filterType
}

export interface TodoState {
    todoLists: TodoList[]
}

let todoListId1 = v1()
let todoListId2 = v1()

const initialState: TodoState = {
    todoLists: [
        {id: todoListId1, title: 'to do 1', filter: 'all'},
        {id: todoListId2, title: 'to do 2', filter: 'all'},
    ]
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addToDoList(state, action: PayloadAction<{id: string, text: string}>) {
            state.todoLists.push({
                id: action.payload.id,
                title: action.payload.text,
                filter: 'all'
            })
        }
    }
})

export const { addToDoList } = todoSlice.actions
export default todoSlice.reducer