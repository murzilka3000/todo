import { v1 } from "uuid"
import Todolist, { arrType } from "./components/Todolist"
import { useReducer } from "react"
import './App.css'
import Input from "./components/Input"
import { 
  addTodoListAC, 
  filterTodoListAC, 
  removeTodoListAC, 
  titleTodoListAC, 
  todolistReducer 
} from "./state/todolist-reducer"
import {
  addTaskAC, 
  isDoneTaskAC, 
  removeTaskAC, 
  taskReducer, 
  textChangeTaskAC 
} from "./state/task-reducer"

export type filterType = 'all' | 'complete' | 'active'

export type todoListsType = {
  id: string,
  title: string,
  filter: filterType
}

export type tasksAllType = {
  [key: string]: Array<arrType>
}

const App = () => {

  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todoLists, dispatchTodoListReducer] = useReducer( todolistReducer,
    [
      {id: todoListId1, title: 'to do 1', filter: 'all'},
      {id: todoListId2, title: 'to do 2', filter: 'all'},
    ]
  )

  let [tasksObj, dispatchTasksReducer] = useReducer(taskReducer, {
    [todoListId1]: 
    [
      {id: v1(), text: 'css', isDone: true},
      {id: v1(), text: 'js', isDone: false},
      {id: v1(), text: 'html', isDone: true},
      {id: v1(), text: 'react', isDone: false},
    ],
    [todoListId2]: 
    [
      {id: v1(), text: 'py', isDone: true},
      {id: v1(), text: 'c++', isDone: false},
      {id: v1(), text: 'buy', isDone: false},
      {id: v1(), text: 'c++', isDone: false},
    ],
  }
  )

  const filterTasks = (value: filterType, todoListId: string) => {
    const action = filterTodoListAC(value, todoListId )
    dispatchTodoListReducer(action)
  }

  const removeTasks = (id: string, todoListId: string) => {
    const action = removeTaskAC(id, todoListId )
    dispatchTasksReducer(action)
  }

  const removeTodoList = (todoListId: string) => {
    const action = removeTodoListAC( todoListId )
    dispatchTodoListReducer(action)
    dispatchTasksReducer(action)
  }

  const changeTaskTitle = (title: string, todoListId: string) => {
    const action = titleTodoListAC( title, todoListId )
    dispatchTodoListReducer(action)
  }

  const addToDoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatchTodoListReducer(action)
    dispatchTasksReducer(action)
  }

  const addTask = (text: string, todoListId: string) => {
    const action = addTaskAC(todoListId, text )
    dispatchTasksReducer(action)
  }

  const changeTaskText = (id: string, text: string, todoListId: string) => {
    const action = textChangeTaskAC( id, todoListId, text )
    dispatchTasksReducer(action)
  }
 //error
  const isDoneController = (id: string, isDone: boolean, todoListId: string  ) => {
    const action = isDoneTaskAC(id, todoListId, isDone)
    dispatchTasksReducer(action)
  }

  return (
    <div>
      <div className="input-title">
        <Input
        addTask={addToDoList}
        id={''}
        />
      </div>
      <div className="flex">
      {
        todoLists.map(tl => {

          let filterItem = tasksObj[tl.id]

          if(tl.filter === 'complete') {
            filterItem = filterItem.filter(t => t.isDone === true)
          }

          if(tl.filter === 'active') {
            filterItem = filterItem.filter(t => t.isDone === false)
          }

          return(
            <Todolist
            key={tl.id}
            title={tl.title}
            tasks={filterItem}
            removeTasks={removeTasks}
            addTask={addTask}
            filterTasks={filterTasks}
            filter={tl.filter}
            isDoneController={isDoneController}
            id={tl.id}
            removeTodoList={removeTodoList}
            changeTaskText={changeTaskText}
            changeTaskTitle={changeTaskTitle}
            />
          )
        })
      }
      </div>
    </div>
  )
}

export default App