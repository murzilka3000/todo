import { tasksAllType, todoListsType } from "./AppWithRedux"
import { taskReducer } from "./state/task-reducer"
import { addTodoListAC, todolistReducer } from "./state/todolist-reducer"


test('ids should be equals', () => { 
    const startTasksState: tasksAllType = {}
    const startTodoListsState: todoListsType[] = []

    const action = addTodoListAC('new todoList')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todolistReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFormTasks = keys[0]
    const idFormTodoLists = endTodoListsState[0].id

    expect(idFormTasks).toBe(action.todoListId)
    expect(idFormTodoLists).toBe(action.todoListId)
 })