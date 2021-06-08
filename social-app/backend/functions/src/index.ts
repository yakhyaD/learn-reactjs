const functions = require('firebase-functions')
const cors = require('cors')

// App Initalization
const app = require('express')()

app.use(cors({origin: '*'}))

// Auth middleware
const firebaseAuth  = require('./middlewares/firebaseAuth')

// Route Handler
const { registerHandler, loginHandler, uploadImageHandler, addUserDetails, getAuthenticatedUser, getUserData } = require('./handlers/user')
const { getAllScreams, addScream, getOneScream, commentOnScream, likeScream, unlikeScream, deleteScream } =  require('./handlers/screams')



// Screams Routes
app.get('/screams', getAllScreams)
app.post('/scream', firebaseAuth, addScream)
app.get('/scream/:screamId', getOneScream)
app.post('/scream/:screamId/comment', firebaseAuth, commentOnScream)
app.post('/scream/:screamId/like', firebaseAuth, likeScream)
app.post('/scream/:screamId/unlike', firebaseAuth, unlikeScream)
app.delete('/scream/:screamId', firebaseAuth, deleteScream)



// User Routes
app.post('/register', registerHandler)
app.post('/login', loginHandler)
app.post('/user/image', firebaseAuth, uploadImageHandler)
app.post('/user/addDetails', firebaseAuth, addUserDetails)
app.get('/user/details', firebaseAuth ,getAuthenticatedUser)
app.get('/user/:userHandle' ,getUserData)


exports.api = functions.https.onRequest(app)

// Notifications
exports.CreateNotifacationOnLike = functions.firestore
    .document('likes/{id}')
    .onCreate((snapshot: any) => {
        return db.doc(`/screams/${snapshot.data().screamId}`).get()
        .then((doc: any) => {
            if (doc.exist && doc.data().userHandle !== snapshot.data().handle) {
                db.docs(`/notifications/${doc.id}`).set({
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().handle,
                    read: false,
                    screamId: doc.id,
                    type: 'like',
                    createdAt: new Date().toISOString()
                })
            }
        })
        .then(() => {
            return
        })
        .catch((err: {code: string, message: string}) => {
            console.error(err.message)
            return
        })
    })

exports.CreateNotifacationOnUnLike = functions.firestore
    .document('likes/{id}')
    .onDelete((snapshot: any) => {
        return db.doc(`/notifications/${snapshot.id}`).delete()
        .then(() => {
            return
        })
        .catch((err: {code: string, message: string}) => {
            console.error(err.message)
            return
        })
    })

exports.CreateNotifacationOnComment = functions.firestore
    .document('comments/{id}')
    .onCreate((snapshot: any) => {
        return db.doc(`/screams/${snapshot.data().screamId}`).get()
        .then((doc: any) => {
            if (doc.exist && doc.data().userHandle !== snapshot.data().handle) {
                db.doc(`/notifications/${doc.id}`).set({
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().handle,
                    read: false,
                    screamId: doc.id,
                    type: 'comment',
                    createdAt: new Date().toISOString()
                })
            }
        })
        .then(() => {
            return
        })
        .catch((err: {code: string, message: string}) => {
            console.error(err.message)
            return
        })
    })
exports.onUserImageChange = functions.firestore
    .document('/user/{userId}')
    .onUpdate((change: any) => {

        if (change.before.data().userImage !== change.after.data().userImage) {
            const batch = db.batch()

            return db.collection('screams').where('userHandle', '==', change.before.data().userHandle).get()

            .then((data: any) => {
                data.forEach((doc: any) => {
                    const scream = db.doc(`/screams/${doc.id}`)
                    batch.update(scream, {userImage: change.after.data().imageUrl})
                })
                return batch.commit()
            })
        } else {
            return
       }
    })
exports.onScreamDelete = functions.firestore
    .document('screams/{screamId}')
    .onDelete((snapshot: any, context: any) => {
        const screamId = context.params.screamId
        const batch = db.batch()

        return db.collection('likes').where('screamId', '==', screamId).get()
            .then((data: any) => {
                data.forEach((doc: any) => {
                    batch.delete(db.doc(`/likes/${doc.id}`))
                })
                return db.collection('comments').where('screamId', '==', screamId).get()
            })
            .then((data: any) => {
                data.forEach((doc: any) => {
                    batch.delete(db.doc(`/comments/${doc.id}`))
                })
                return db.collection('notiications').where('screamId', '==', screamId).get()
            })
            .then((data: any) => {
                data.forEach((doc: any) => {
                    batch.delete(db.doc(`/likes/${doc.id}`))
                })
                return batch.commit()
            })
            .catch((err: any) => {
                console.error(err)
            }   )
    })