import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Preloader } from '../layout/Preloader'

export const NoteDetails = (props) => {
    const id = props.match.params.id
    
    useFirestoreConnect([
        {
            collection: "notes",
            doc: id
        }
    ])
    const note = useSelector(({ firestore: { data } }) => data.notes && data.notes[id])
   
    return (
        <div className="container section">
           { note ?
                <div className="card z-depth-8">
                    <div className="card-content">
                        <span className="card-title">{note.title}</span>
                        <p>{note.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>{moment(note.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
                : <Preloader />
            }
        </div>
    )
}
