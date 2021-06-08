import { UserRequest, UserResponse } from '../utils/interfaces'
import { NextFunction } from 'express'
const { db, admin } = require('../utils/admin')


module.exports = (req: UserRequest, res: UserResponse, next: NextFunction) => {
    let idToken: string
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1]
    } else {
        console.log('No token found')
        return res.status(403).json({ error: "Unauthorized Action"})
    }
    admin.auth().verifyIdToken(idToken)
        .then((decodedToken: any) => {
            req.user = decodedToken
            return db.collection('users').where('userId', '==', req.user.uid).limit(1).get()
        })
        .then((data: any) => {
            req.user.handle = data.docs[0].data().handle
            req.user.imageUrl = data.docs[0].data().imageUrl
            return next()
        })
        .catch((err: any) => {
            return res.status(403).json(err)
        })
}