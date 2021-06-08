import {  SET_USER, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, LOADING_USER, SET_UNAUTHENTICATED } from '../type'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI})
    axios.post('http://localhost:5000/shin-socialapp/us-central1/api/login', userData)
        .then((res) => {
            const FBIdToken = `Bearer ${res.data.token}`
            setAuthenticated(FBIdToken)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS})
            history.push('/')
        })
        .catch((error) => {
            dispatch({ type: SET_ERRORS, payload: error.response.data})
        })
}
export const signupUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('http://localhost:5000/shin-socialapp/us-central1/api/register', userData)
        .then((res) => {

            const FBIdToken = `Bearer ${res.data.token}`
            setAuthenticated(FBIdToken)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS})
            history.push('/')
        })
        .catch((error) => {
            dispatch({type: 'SET_ERRORS', payload: error.response.data})
        })
}
export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })

    axios.get('http://localhost:5000/shin-socialapp/us-central1/api/user/details')
        .then((res) => {
            dispatch({ type: SET_USER, payload: res.data})
        })
        .catch((error) => {
            return dispatch({ type: SET_ERRORS, payload: error.response.data })
        })
}
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })

    axios.post('http://localhost:5000/shin-socialapp/us-central1/api/user/image', formData)
        .then(() => {
            dispatch(getUserData())
        })
        .catch((error) => dispatch({ type: SET_ERRORS, payload: error.response.data}))
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    dispatch({ type: SET_UNAUTHENTICATED })
    //window.location.href = '/login'
}
export const setAuthenticated = (FBIdToken) => {
    localStorage.setItem("FBIdToken", FBIdToken)
    axios.defaults.headers.common["Authorization"] = FBIdToken
}

export const editDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post('http://localhost:5000/shin-socialapp/us-central1/api/user/addDetails', userDetails)
        .then((res) => (
            dispatch(getUserData())
        ))
        .catch((err) => (
            dispatch({type: SET_ERRORS, payload: err.response.data})
        ))
}