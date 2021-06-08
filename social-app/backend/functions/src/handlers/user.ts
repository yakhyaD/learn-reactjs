import { UserRequest, UserResponse, newUser, User, UserData, DataUser } from '../utils/interfaces'

const {firebase, firebaseConfig } = require('../config/firebaseConfig')
const { db, admin } = require('../utils/admin')
const {registerValidation, loginValidation, reduceDetailsUser } = require('../utils/validate')

const imageTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg']

exports.registerHandler = (req: UserRequest, res: UserResponse) => {
    const newUser: newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    }
    // Validate data
    const { valid, errors } = registerValidation(newUser)
    if(!valid) return res.status(400).json(errors)

    let default_image: string = 'default-image.png'
    let token: string
    let userId: string


    db.doc(`/users/${newUser.handle}`).get()
        .then((doc: any) => {

            if (doc.exists) throw new Error("This handle is already taken")

            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        })
        .then((data: any) => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then((idToken: string) => {
            token = idToken
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId: userId,
                imageUrl:`https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${default_image}?alt=media`,
            }
            return db.doc(`/users/${newUser.handle}`).set(userCredentials)

        })
        .then(() => {
            return res.status(201).json({ token: token })
        })
        .catch((error: { code?: string, message?: string }) => {
            console.error(error)
            if (error.code === "auth/email-already-use") {
                res.status(400).json({ error: "Email is already used" })
            }
            return res.status(500).json({ error: error.message })
        })
}
exports.loginHandler = (req: UserRequest, res: UserResponse) => {
    const user: User = {
        email: req.body.email,
        password: req.body.password
    }
    // Validate data
    const { valid, errors } = loginValidation(user);
    if (!valid) {
        return res.status(400).json(errors);
    }
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((data: any) =>  data.user.getIdToken() )
        .then((token: string) => res.json({ token }))
        .catch((error: {message: string, code: string}) => {
            console.error(error);
            return res.status(500).json({error: 'wrong credentaials. Try again!!!'})
        })
}
exports.uploadImageHandler = (req: UserRequest, res: UserResponse) => {
    const Busboy = require('busboy')
    const path = require('path')
    const os = require('os')
    const fs = require('fs')

    const busboy = new Busboy({ headers: req.headers })

    let imageFileName: string
    let imageToBeUploaded: {filePath: string, mimetype: string}

    busboy.on('file', (fieldname: any, file: any, filename: any, encoding: any, mimetype: any) => {

    if(!imageTypes.includes(mimetype)) return res.status(400).json({error: "Wrong file uploaded"})

        const imageExtension = filename.split('.')[filename.split('.').length - 1]
        imageFileName = `${Math.round(Math.random() * 10000000)}.${imageExtension}`
        const filePath = path.join(os.tmpdir(), imageFileName)
        imageToBeUploaded = {filePath, mimetype}
        file.pipe(fs.createWriteStream(filePath))
    })
    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filePath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`
                return db.doc(`/users/${req.user.handle}`).update({imageUrl})
            })
            .then(() => {
                return res.status(201).json({message: "Image uploaded successfully"})
            })
            .catch((err: {code: string, message: string}) => {
                console.error(err)
                return res.status(500).json({error: err.message})
            })
    })
    busboy.end(req.rawBody)
}
exports.addUserDetails = (req: UserRequest, res: UserResponse) => {
    const userDetails = reduceDetailsUser(req.body)
    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.status(201).json({message: 'User Details added successfully'})
        })
        .catch((err: {code: string, message: string}) => {
            return res.status(500).json({error: err.message})
        })
}
exports.getAuthenticatedUser = (req: UserRequest, res: UserResponse) => {
    let userData = {} as UserData

    db.doc(`/users/${req.user.handle}`).get()
        .then((doc: any) => {
            if (doc.exists) {
                userData.credentials = doc.data()
                return db.collection('notifications').where('receipient', '==', req.user.handle).limit(10).orderBy('createdAt', 'desc').get()
            }
        })
        .then((data: any) => {
            userData.notifications = []
            data.forEach((doc: any) => {
                userData.notifications.push(doc.data())
            })
             return db.collection('likes').where('handle', '==', req.user.handle).get()
        })
        .then((data: any) => {
            userData.likes = []
            data.forEach((doc: any) => {
                userData.likes.push(doc.data())
            })
            return res.json(userData)
        })
        .catch((err: {code: string, message: string}) => {
            console.error(err)
            return res.status(500).json({error: err.message})
        })
}
exports.getUserData = (req: UserRequest, res: UserResponse) => {
    let DataUser = {} as DataUser

    db.doc(`/users/${req.params.userHandle}`).get()
        .then((doc: any) => {
            if (doc.exists) {
                DataUser.user = doc.data()
                return db.collection('screams').where('userHandler', '==', req.params.userHandle).orderBy('createdAt', 'desc').get()
            } else {
            	throw new Error('User does not exist')
            }
        })
        .then((data: any) => {
            DataUser.screams = []
            data.forEach((doc: any) => {
                DataUser.screams.push({...doc.data(), screamId: doc.id})
            })
            return res.json(DataUser)
        })
        .catch((err: {code?: string, message: string}) => {
            console.error(err)
            return res.status(500).json({error: err.message})
        })
}


















