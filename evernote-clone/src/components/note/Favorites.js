import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import NotesListes from './NotesListes'

export const Favorites = () => {
    useFirestoreConnect([
        {   collection: 'notes',
            where: ["favorite", "==", true],
            orderBy: ['createdAt', 'desc'],
            storeAs: "favnotes"
        }
        
    ])
    const data = useSelector((state) => state.firestore.data["favnotes"])
    const favNotes = []    
    for (let index in data) {
        favNotes.push({ id: index, ...data[index] })
    }
    
    return (
        <div>
            <NotesListes notes={favNotes} />
        </div>
    )
}
