import { useContext, createContext, useEffect, useState } from 'react'
import { auth } from '../config/firebaseConfig'

const AuthContext = createContext()

export const useAuth = () => (useContext(AuthContext)) 

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true);

    // const register = (email, password) => (
    //     auth.createUserWithEmailAndPassword(email, password)
    // )
    function register(email, password) {
        return  auth.createUserWithEmailAndPassword(email, password)
    }
    const login = (email, password) => (
        auth.signInWithEmailAndPassword(email, password)
    )
    const logout = () => (
        auth.logout()
    )

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{
            register,
            currentUser,
            login,
            logout,
            loading
        }}>
        {!loading && children}
        </AuthContext.Provider>
    )
}