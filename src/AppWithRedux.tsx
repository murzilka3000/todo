import Todolist, { arrType } from "./components/Todolist"
import './App.css'
import Input from "./components/Input"
import { 
  addTodoListAC, 
  filterTodoListAC, 
  removeTodoListAC, 
  titleTodoListAC,  
} from "./state/todolist-reducer"
import {
  addTaskAC, 
  isDoneTaskAC, 
  removeTaskAC,  
  textChangeTaskAC 
} from "./state/task-reducer"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { ReducersType } from "./state/store"

export type filterType = 'all' | 'complete' | 'active'

export type todoListsType = {
  id: string,
  title: string,
  filter: filterType
}

export type tasksAllType = {
  [key: string]: Array<arrType>
}

const AppWithRedux = () => {

  const dispatch = useDispatch()

  const todoLists = useSelector<ReducersType, todoListsType[]>(state => state.todoLists)
  const tasks = useSelector<ReducersType, tasksAllType>(state => state.tasks)

  const filterTasks = (value: filterType, todoListId: string) => {
    const action = filterTodoListAC(value, todoListId )
    dispatch(action)
  }

  const removeTasks = (id: string, todoListId: string) => {
    const action = removeTaskAC(id, todoListId )
    dispatch(action)
  }

  const removeTodoList = (todoListId: string) => {
    const action = removeTodoListAC( todoListId )
    dispatch(action)
  }

  const changeTaskTitle = (title: string, todoListId: string) => {
    const action = titleTodoListAC( title, todoListId )
    dispatch(action)
  }

  const addToDoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatch(action)
  }

  const addTask = (text: string, todoListId: string) => {
    const action = addTaskAC(todoListId, text )
    dispatch(action)
  }

  const changeTaskText = (id: string, text: string, todoListId: string) => {
    const action = textChangeTaskAC( id, text, todoListId )
    dispatch(action)
  }

  const isDoneController = (id: string, isDone: boolean, todoListId: string  ) => {
    const action = isDoneTaskAC(id, todoListId, isDone)
    dispatch(action)
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

          let filterItem = tasks[tl.id]

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

export default AppWithRedux