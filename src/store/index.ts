import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import todoListReducer, {TodoState} from './todoSlice'

const store: EnhancedStore<{todoLists: TodoState}> = configureStore({
    reducer: {
        todoLists: todoListReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;