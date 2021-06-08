import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useInput from '../../customhook/useInput'
import { addNote } from '../../store/actions/noteActions'

const Form = () => {
    const [title, bindTitle, resetTitle] = useInput('')
    const [content, bindContent, resetContent] = useInput('')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if((title === "" || content === "")){
           return setError('Fill the fields please')
        }
        dispatch(addNote({ title, content }))
        resetTitle()
        resetContent()
        setError(null)
    }
    return (
        <div className="section">
            <form onSubmit={handleSubmit} className="white">
            {error && <div className="wrapper white-text red lighten-1" style={{padding: "10px", borderRadius: "3px"}}>{error}</div> }
                <h5 className="grey-text text-darken-3">New Note</h5>
                <div className="input-field ">
                    <input id="first_name" type="text" className="validate" {...bindTitle} />
                    <label htmlFor="note_title">Note Title</label>
                </div>
                <div className="input-field">
                    <textarea id="textarea1" className="materialize-textarea" {...bindContent}></textarea>
                    <label htmlFor="textarea1">Note Content</label>
                </div>
                <button className="btn green">Add</button>
            </form>
        </div>
    )
}

export default Form
