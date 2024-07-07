
import { removeTaskAC, taskReducer } from './state/task-reducer'
import { tasksAllType } from "./App"

test('add task', () => { 
    const startState: tasksAllType = {
        'todoListId1': [
            {id: '1', text: 'css', isDone: true},
            {id: '2', text: 'js', isDone: false},
            {id: '3', text: 'html', isDone: true},
            {id: '4', text: 'react', isDone: false},
        ],
        'todoListId2': [
            {id: '1', text: 'py', isDone: true},
            {id: '2', text: 'c++', isDone: false},
            {id: '3', text: 'buy', isDone: false},
            {id: '4', text: 'c++', isDone: false},
        ],
    }

    const action = removeTaskAC('2', 'todoListId2')

    const endState = taskReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t => t.id != '2')).toBeTruthy()
 })

