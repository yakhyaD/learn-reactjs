const addNote = (note) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        firestore
            .collection("notes")
            .add({
                ...note,
                favorite: false,
                createdAt: new Date()
            })
            .then(() => console.log('noted successfully add'))
            .catch((err) => console.log(err))
    }
}
const deleteNote = (note) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase().firestore()
        firebase
            .collection('notes').doc(note.id)
            .delete()
            .then(() => console.log('note successfully'))
            .catch((err) => console.log(err))
    }
}
const toggleFavorite = (note) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        const favStatus = !note.favorite
        firestore
            .collection('notes').doc(note.id)
            .update({
                favorite: favStatus
            })
            .then(() => console.log("Note state changed"))
            .catch(err => console.log(err))
    }
}
const getfavoritesNote = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        firestore
            .collection('notes')
            .get().then(snapchot => {
                snapchot.doc.forEach(doc => console.log(doc))
            })
    }
}
const editNote = (note) => {
    return(dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        firestore
            .collection('notes').doc(note.id)
            .update({
                title: note.title,
                content: note.content,
            })
            .then(() => console.log("Note successfully edited"))
            .catch(err => console.log(err))

    }
}
export { addNote, deleteNote, toggleFavorite, getfavoritesNote, editNote }