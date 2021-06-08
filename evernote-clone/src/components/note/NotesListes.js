import React from 'react'
import { Preloader } from '../layout/Preloader'
import { isLoading, isEmpty } from "react-redux-firebase";
import { Note } from './Note'

const NotesListes = ({notes}) => {

    return (
        <div className="noteslist">
        {   isLoading ?
            <Preloader />    
            :
            isEmpty(notes) ?
            
            <div>No notes yet.</div>
            
            : notes.map(note =>

            <Note note={note} key={note.id} />
            )
        }

    </div>
    )
}

export default NotesListes
