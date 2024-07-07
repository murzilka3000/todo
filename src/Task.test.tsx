import { 
    addTaskAC, 
    isDoneTaskAC, 
    removeTaskAC, 
    taskReducer, 
    textChangeTaskAC
} from './state/task-reducer'
import { tasksAllType } from "./App"
import { addTodoListAC, removeTodoListAC } from './state/todolist-reducer'

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

    expect(endState['todoListId1'].length).toBe(4)
    expect(endState['todoListId2'].length).toBe(3)
    expect(endState['todoListId2'].every(t => t.id != '2')).toBeTruthy()
})

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

    const action = addTaskAC('5', 'todoListId2', 'murzilka300')

    const endState = taskReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(4)
    expect(endState['todoListId2'].length).toBe(5)
    expect(endState['todoListId2'][0].isDone).toBe(false)
    expect(endState['todoListId2'][0].text).toBe('murzilka300')
})

  test('isDone controller', () => { 
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

    const action = isDoneTaskAC('1', 'todoListId1', false)

    const endState = taskReducer(startState, action)

    expect(endState['todoListId1'][0].isDone).toBe(false)
    expect(endState['todoListId2'][0].isDone).toBe(true)
})

   test('text Change controller', () => { 
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


    const action = textChangeTaskAC('1', 'todoListId1', 'task 1')

    const endState = taskReducer(startState, action)

    expect(endState['todoListId1'][0].text).toBe('task 1')
    expect(endState['todoListId2'][0].text).toBe('py')
})

   test('two array', () => { 
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

    const action = addTodoListAC('title no matter')
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListId1' && k!= 'todoListId2')
    if(!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('delete', () => { 
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

    const action = removeTodoListAC('todoListId1')

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId1']).not.toBeDefined()
 })

