import { ChangeEvent, useState, KeyboardEvent } from "react"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import '../App.css'

type taskType = {
    addTask: (text: string, todoListId: string) => void,
    id: string,
}

const Input = (props: taskType) => {

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCount(e.currentTarget.value)
        setError('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (count.trim() !== '') {
            props.addTask(count, props.id);
            setCount('')
        } else {
            setError('field id require')
        }
    }

    const [count, setCount] = useState('')
    const [error, setError] = useState<string | null>(null)

    return (
        <>
            <div className="flex-title">
                <TextField 
                id="outlined-basic" 
                label="Outlined" 
                variant="outlined" 
                type="text"
                value={count}
                onChange={changeHandler}
                onKeyDown={onKeyDownHandler}
                size='small'
                />
                <div className="input-button">
                    <IconButton 
                    onClick={addTaskHandler}
                    className="remove" 
                    color="secondary"
                    >
                        <PlaylistAddIcon />
                    </IconButton>
                </div>
            </div>
            {error ? <p className="error">{error}</p> : ''}
        </>
    )
}

export default Input