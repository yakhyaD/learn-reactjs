import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import useInput from '../../customhook/useInput'
import { editNote } from '../../store/actions/noteActions'

export const EditNote = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const note = useSelector(state => state.note)

    const [title, bindTitle, resetTitle] = useInput(note.title)
    const [content, bindContent, resetContent] = useInput(note.content)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editNote({ id: note.id, title, content }))
        history.push('/')
        resetTitle()
        resetContent()
    }
    return (
        <div className="section">
        <form onSubmit={handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Edit Note</h5>
            <div className="input-field ">
                <input id="first_name" type="text" className="validate" {...bindTitle} />
                <label htmlFor="note_title" className="active">Note Title:</label>
            </div>
            <div className="input-field">
                <textarea id="textarea1" className="materialize-textarea" {...bindContent}></textarea>
                <label htmlFor="textarea1" className="active">Note Content:</label>
            </div>
            <button className="btn green">Edit</button>
        </form>
    </div>
    )
}
