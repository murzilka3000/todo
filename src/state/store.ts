import { legacy_createStore as createStore, combineReducers } from "redux";
import { todolistReducer } from "./todolist-reducer";
import { taskReducer } from "./task-reducer";


const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: taskReducer
});


export type ReducersType = ReturnType<typeof rootReducer>;


export const store = createStore(
    rootReducer,
);
