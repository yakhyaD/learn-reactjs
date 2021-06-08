import { Scream, UserRequest, UserResponse, newScream, ScreamData } from '../utils/interfaces';
const { db } = require('../utils/admin')


exports.getAllScreams = (req: UserRequest, res: UserResponse) => {
   db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data: any) => {
        let screams: Scream[] = []
            data.forEach((doc: any) => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandler: doc.data().userHandler,
                    createdAt: doc.data().createdAt,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                })
            })
        return res.json(screams)
    })
    .catch((err: {code: string, message: string }) => res.status(400).json({error: err.message}))
}
exports.addScream =  (req: UserRequest, res: UserResponse) => {
    if (req.body.body.trim() === "") {
        return res.status(400).json({error: "Body must not be empty"})
    }
    const newScream: newScream = {
        body: req.body.body,
        userHandler: req.user.handle,
        userImage: req.user.imageUrl,
        likeCount: 0,
        commentCount: 0,
        createdAt: new Date().toISOString(),
    }
    db.collection('screams')
      .add(newScream)
        .then((scream: any) => {
            const resScream = newScream
            resScream.screamId = scream.id
        return res.json(resScream)
      })
      .catch((err: string) => res.status(400).json({message: err}))
}
exports.getOneScream = (req: UserRequest, res: UserResponse) => {
    //const screamId: string = req.params.screamId
    let screamData: ScreamData

    db.doc(`/screams/${req.params.screamId}`).get()
        .then((doc: any) => {
            if (!doc.exists) {
                throw new Error('Not Found')
            }
            screamData = doc.data()
            screamData.screamId = doc.id
            return db.collection('comments').where('screamId', '==', req.params.screamId).get()
        })
        .then((data: any) => {
            screamData.comments = []

            data.forEach((doc: any) => {
                //console.log(doc.data())
                screamData.comments.push(doc.data())
            })
            return res.json(screamData)
        })
        .catch((error: {code: string, message: string}) => {
            console.error(error)
            if (error.message === "Not Found") {
                return res.status(404).json({error: "Scream Not Found"})
            }
            return res.status(500).json({error: error.message})
        })
}
exports.commentOnScream = (req: UserRequest, res: UserResponse) => {
    if (req.body.body.trim() === '') return res.status(400).json({ error: "Must not be empty" })

    const newComment = {
        screamId: req.params.screamId,
        body: req.body.body,
        handle: req.user.handle,
        imageUrl: req.user.imageUrl,
        createdAt: new Date().toISOString(),
    }
    db.doc(`/screams/${req.params.screamId}`).get()
        .then((doc: any) => {
            if(!doc.exists){
                throw new Error('Not Founded')
            }
            return doc.ref.update({commentCount: doc.data().commentCount + 1})

        })
        .then(() => {
            return db.collection('comments').add(newComment)
        })
        .then(() => {
            return res.json(newComment)
        })
        .catch((error: {code: string, message: string}) => {
            console.error(error)
            if (error.message === "Not Found") {
                return res.status(404).json({error: "Scream Not Found"})
            }
            return res.status(500).json({error: error.message})
        })

}
exports.likeScream = (req: UserRequest, res: UserResponse) => {
    const likeDocument = db.collection('likes').where('handle', '==', req.user.handle).where('screamId', '==', req.params.screamId).limit(1)

    const screamDocument = db.doc(`/screams/${req.params.screamId}`)

    let screamData: any
    screamDocument.get()
        .then((doc: any) => {
            if (doc.exists) {
                screamData = doc.data()
                screamData.screamId = doc.id
                return likeDocument.get()
            } else {
                throw new Error ('Scream not found')
            }
        })
        .then((data: any) => {
            if (data.empty) {
                return db.collection('likes').add({
                    screamId: req.params.screamId,
                    handle: req.user.handle
                })
                .then(() => {
                    screamData.likeCount++
                    return screamDocument.update({likeCount: screamData.likeCount})
                })
                .then(() => {
                    return res.json(screamData)
                })
            } else {
                throw new Error('Scream already liked')
            }
        })
        .catch((err: {code: string, message: string}) => {
            if (err.message === "Scream not found" || err.message === "Scream already liked") {
                return res.status(400).json({error: err.message})
            }
            return res.status(500).json({error: err.message})
        })
}
exports.unlikeScream = (req: UserRequest, res: UserResponse) => {
    const likeDocument = db.collection('likes').where('screamId', '==', req.params.screamId)
    const screamDocument = db.doc(`/screams/${req.params.screamId}`)

    let screamData: any
    screamDocument.get()
        .then((doc: any) => {
            if (doc.exists) {
                screamData = doc.data()
                screamData.screamId = doc.id
                return likeDocument.get()
            } else {
                throw new Error ('Scream not found')
            }
        })
        .then((data: any) => {
            if (data.empty) {
                throw new Error('Scream does not liked')
            } else {
                return db.doc(`/likes/${data.docs[0].id}`).delete()

                .then(() => {
                    screamData.likeCount--
                    return screamDocument.update({likeCount: screamData.likeCount})
                })
                .then(() => {
                    return res.json(screamData)
                })
            }
        })
        .catch((err: {code: string, message: string}) => {
            if (err.message === "Scream not found" || err.message === "Scream already liked") {
                return res.status(400).json({error: err.message})
            }
            return res.status(500).json({error: err.message})
        })
}
exports.deleteScream = (req: UserRequest, res: UserResponse) => {
    let document = db.doc(`/screams/${req.params.screamId}`)

    document.get()
        .then((doc: any) => {
            if (!doc.exists) {
                throw new Error('Scream does not exist')
            } else if (doc.data().userHandler !== req.user.handle) {
                throw new Error('Denied')
            }
            else {
                return document.delete()
            }
        })
        .then(() => {
            return res.json({message: "Scream deleted successfully"})
        })
        .catch((err: { code: string, message: string }) => {

            if (err.message.startsWith("Scream")) {
                return res.status(400).json({error: err.message})
            } else if (err.message.startsWith('Denied')) {
                return res.status(403).json({error: "Unauthorized action"})
            }
            return res.status(500).json({error: err.message})
        })
}