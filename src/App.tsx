import { v1 } from "uuid"
import Todolist, { arrType } from "./components/Todolist"
import { useState } from "react"
import './App.css'
import Input from "./components/Input"

export type filterType = 'all' | 'complete' | 'active'

export type todoListsType = {
  id: string,
  title: string,
  filter: filterType
}

type tasksAllType = {
  [key: string]: Array<arrType>
}

const App = () => {

  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todoLists, setTodoLists] = useState<Array<todoListsType>>(
    [
      {id: todoListId1, title: 'to do 1', filter: 'all'},
      {id: todoListId2, title: 'to do 2', filter: 'all'},
    ]
  )

  let [tasksObj, setTasks] = useState<tasksAllType>({
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
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if(todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  const removeTasks = (id: string, todoListId: string) => {
    let tasks = tasksObj[todoListId]
    let remove = tasks.filter(t => t.id !== id)
    tasksObj[todoListId] = remove
    setTasks({...tasksObj})
  }

  const removeTodoList = (todoListId: string) => {
    if(confirm('вы уверены?')) {
      let removeTodo = todoLists.filter(tl => tl.id !== todoListId)
      setTodoLists([...removeTodo])
    } else {
      return
    }
  }

  const addTask = (text: string, todoListId: string) => {
    let task = {id: v1(), text: text, isDone: false}
    let tasks = tasksObj[todoListId]
    let newTasks = [task, ...tasks]
    tasksObj[todoListId] = newTasks
    setTasks({...tasksObj})
  }

  const isDoneController = (id: string, isDone: boolean, todoListId: string) => {
    let tasks = tasksObj[todoListId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }

  const addToDoList = (title: string) => {
    if(title.trim() !== '') {
      let newToDoListId = v1()
      let NewToDoList: todoListsType = {id: newToDoListId, title: title, filter: 'all'}
      setTodoLists([NewToDoList, ...todoLists])
      setTasks({...tasksObj, [newToDoListId]: []})
    }
  }

  const changeTaskText = (id: string, text: string, todoListId: string) => {
    let tasks = tasksObj[todoListId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.text = text
      setTasks({...tasksObj})
    }
  }

  const changeTaskTitle = (title: string, todoListId: string) => {
    let task = todoLists.find(tl => tl.id === todoListId)
    if (task) {
      task.title = title
      setTodoLists([...todoLists])
    }
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