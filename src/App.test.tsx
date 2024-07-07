import { v1 } from "uuid"
import { filterType, tasksAllType, todoListsType } from "./App"
import { 
    addTodoListAC,  
    filterTodoListAC,  
    removeTodoListAC, 
    titleTodoListAC, 
    todolistReducer
 } from "./state/todolist-reducer"

test('correct todolist should removed', () => { 
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<todoListsType> = [
        {id: todoListId1, title: 'to do 1', filter: 'all'},
        {id: todoListId2, title: 'to do 2', filter: 'all'},
    ]

    const endState = todolistReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2)
 })

 test('correct todolist should added', () => { 
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodolistTitle = 'NewTodoList'

    const startState: Array<todoListsType> = [
        {id: todoListId1, title: 'to do 1', filter: 'all'},
        {id: todoListId2, title: 'to do 2', filter: 'all'},
    ]

    const endState = todolistReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
  })

  test('correct todolist should change is is name', () => { 
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodolistTitle = 'NewTodoList'

    const startState: Array<todoListsType> = [
        {id: todoListId1, title: 'to do 1', filter: 'all'},
        {id: todoListId2, title: 'to do 2', filter: 'all'},
    ]

    const endState = todolistReducer(startState, titleTodoListAC(newTodolistTitle, todoListId2))

    expect(endState[0].title).toBe('to do 1')
    expect(endState[1].title).toBe(newTodolistTitle)
   })

   test('correct filter of todolist should be changed', () => { 
        let todoListId1 = v1()
        let todoListId2 = v1()

        let newFilter: filterType = 'complete'

        const startState: Array<todoListsType> = [
            {id: todoListId1, title: 'to do 1', filter: 'all'},
            {id: todoListId2, title: 'to do 2', filter: 'all'},
        ] 

        const endState = todolistReducer(startState, filterTodoListAC(newFilter, todoListId2))

        expect(endState[0].filter).toBe('all')
        expect(endState[1].filter).toBe(newFilter)
    })
