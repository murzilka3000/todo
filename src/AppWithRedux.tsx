import Todolist, { arrType } from "./components/Todolist"
import './App.css'
import Input from "./components/Input"
import { 
  addTodoListAC, 
  filterTodoListAC, 
  removeTodoListAC, 
  titleTodoListAC,  
} from "./state/todolist-reducer"
import {addTaskAC} from "./state/task-reducer"
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
    dispatch(filterTodoListAC(value, todoListId ))
  }

  const removeTodoList = (todoListId: string) => {
    dispatch(removeTodoListAC( todoListId ))
  }

  const changeTaskTitle = (title: string, todoListId: string) => {
    dispatch(titleTodoListAC( title, todoListId ))
  }

  const addToDoList = (title: string) => {
    dispatch(addTodoListAC(title))
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

          return(
            <Todolist
            key={tl.id}
            title={tl.title}
            filterTasks={filterTasks}
            filter={tl.filter}
            id={tl.id}
            removeTodoList={removeTodoList}
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