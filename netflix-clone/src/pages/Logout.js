import React from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'

export const Logout = async () => {
    const history = useHistory()
    try {
        auth.signOut()
        history.push("/")
    } catch (error) {
        history.goBack()
    }
}
