import { ChangeEvent } from "react"
import { filterType } from "../App"
import  '../App.css'
import Input from "./Input"
import Span from "./Span"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

 export type arrType = {
    id: string,
    text: string,
    isDone: boolean
} 

export type taskType = {
    title: string,
    tasks: Array<arrType>,
    removeTasks: (id: string, todoListId: string) => void,
    addTask: ( text: string, todoListId: string) => void,
    filterTasks: (value: filterType, todoListId: string) => void,
    filter: filterType,
    isDoneController: (id: string, isDone: boolean, todoListId: string) => void,
    changeTaskText: (id: string, text: string, todoListId: string) => void
    id: string,
    removeTodoList: (todoListId: string) => void,
    changeTaskTitle: (title: string, todoListId: string) => void
}

const Todolist = (props: taskType) => {

    const filterAll = () => {
        props.filterTasks('all', props.id)
    }

    const filterComplete = () => {
        props.filterTasks('complete', props.id)
    }

    const filterActive = () => {
        props.filterTasks('active', props.id)
    }

    const taskController = (newValue: string) => {
        props.changeTaskTitle(newValue, props.id)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    return (
        <Box 
        component="section" 
        sx={{
             p: 2, 
             border: '1px dashed grey', 
             borderRadius: 5,
             backgroundColor: '#f798f854',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'space-between'
            }}
        >
            <div className="flex-col">
                <div className="flex-title todo-top">
                    <h3>
                        <Span text={props.title} onChange={taskController} />
                    </h3>
                    <Button 
                    onClick={removeTodoListHandler} 
                    className="remove" 
                    variant="outlined" 
                    color="error"
                    startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </div>
                <Input
                addTask={props.addTask}
                id={props.id}
                />
                <ul>
                    {
                        props.tasks.map(t => {

                            const removeHandler = () => {
                                props.removeTasks(t.id, props.id)
                            }

                            const isDoneControllerHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.isDoneController(t.id, e.currentTarget.checked, props.id)
                            }

                            const taskController = (newValue: string) => {
                                props.changeTaskText(t.id, newValue, props.id)
                            }

                            return(
                                <li className={t.isDone === true ? "opacity" : ''} key={t.id}>
                                    <div className="flex-title">
                                        <div className="flex-title">
                                            <Checkbox 
                                            defaultChecked color="secondary" 
                                            checked={t.isDone}
                                            onChange={isDoneControllerHandler}
                                            />
                                            <Span text={t.text} onChange={taskController} />
                                        </div>
                                        <IconButton 
                                        aria-label="delete"
                                        onClick={removeHandler}
                                        color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="flex-title">
                <Button 
                variant="contained" 
                size="medium"
                onClick={filterAll}
                color={props.filter === 'all' ? 'secondary': 'error'}
                >
                    all
                </Button>
                <Button 
                variant="contained" 
                size="medium"
                onClick={filterActive}
                color={props.filter === 'active' ? 'secondary': 'error'}
                >
                    active
                </Button>
                <Button 
                variant="contained" 
                size="medium"
                onClick={filterComplete}
                color={props.filter === 'complete' ? 'secondary': 'error'}
                >
                    complete
                </Button>
            </div>
        </Box>
    )
}

export default Todolist