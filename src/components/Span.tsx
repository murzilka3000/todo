import { ChangeEvent, useState, KeyboardEvent } from "react"
import TextField from '@mui/material/TextField';
import React from "react";

type spanType = {
    text: string,
    onChange: (value: string) => void
}


const Span = (props: spanType) => {

    const [editMode, setEditMode] = useState(true)
    const [count, setCount] = useState('')

    const activateEditMode = () => {
        setEditMode(false)
        setCount(props.text)
    }

    const activateEditModeTwo = () => {
        setEditMode(true)
        props.onChange(count)
    }

    const onBlurHandler = () => {
        activateEditModeTwo()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCount(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onBlurHandler()
        }
    }

    const onDoubleClickHandler = () => {
        activateEditMode()
    }

    return (
        <>
            {editMode ? 
            (<span onDoubleClick={onDoubleClickHandler}>{props.text}</span>) : 
            (<TextField 
                autoFocus 
                onBlur={onBlurHandler} 
                value={count}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                id="outlined-basic" 
                label="text" 
                variant="outlined" 
                type="text"
                size='small'
                />)}
        </>
    )
}

export default React.memo(Span) 

