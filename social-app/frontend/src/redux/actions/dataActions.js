import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    ADD_SCREAM,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    STOP_LOADING_UI,
    SET_SCREAM,
    COMMENT_SCREAM,
    LOADING_COMMENT,
    STOP_LOADING_COMMENT
} from "../type";

import axios from "axios";

export const getAllScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    axios.get('http://localhost:5000/shin-socialapp/us-central1/api/screams')
        .then(res => {
            dispatch({ type: SET_SCREAMS, payload: res.data })
        })
        .catch(() => dispatch({type: SET_SCREAMS, payload: []}))
}
export const getScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.get(`http://localhost:5000/shin-socialapp/us-central1/api/scream/${screamId}`)
        .then(res => {
            dispatch({ type: SET_SCREAM, payload: res.data })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch((error) => console.log(error))
}

export const likeScream = (screamId) => (dispatch) => {
    axios.post(`http://localhost:5000/shin-socialapp/us-central1/api/scream/${screamId}/like`)
        .then((res) => dispatch({ type: LIKE_SCREAM, payload: res.data}))
        .catch((err) => console.log(err))
}
export const unlikeScream = (screamId) => (dispatch) => {
    axios.post(`http://localhost:5000/shin-socialapp/us-central1/api/scream/${screamId}/unlike`)
        .then((res) => dispatch({ type: UNLIKE_SCREAM, payload: res.data}))
       .catch((err) => console.log(err))
}
export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`http://localhost:5000/shin-socialapp/us-central1/api/scream/${screamId}`)
        .then(() => dispatch({ type: DELETE_SCREAM, payload: screamId }))
        .catch((err) => console.log(err))
}
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('http://localhost:5000/shin-socialapp/us-central1/api/scream', newScream)
        .then((res) => {
            dispatch({ type: ADD_SCREAM, payload: res.data })
        })
        .catch((err) => dispatch({type: SET_ERRORS, payload: err.response.data}))
}
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
    dispatch({type: STOP_LOADING_COMMENT})
}
export const commentScream = (screamId, comment) => (dispatch) => {
    dispatch({ type: LOADING_COMMENT })
    axios.post(`http://localhost:5000/shin-socialapp/us-central1/api/scream/${screamId}/comment`, comment)
        .then((res) => {
            dispatch({ type: COMMENT_SCREAM, payload: res.data })
            dispatch({type: CLEAR_ERRORS})
        })
        .catch((err) => {
            dispatch({type: STOP_LOADING_COMMENT})
            dispatch({ type: SET_ERRORS, payload: err.response.data })
        })
}
export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    axios.get(`http://localhost:5000/shin-socialapp/us-central1/api/user/${userHandle}`)
        .then((res) => dispatch({ type: SET_SCREAMS, payload: res.data.screams }))
        .then((err) => console.log(err))
}