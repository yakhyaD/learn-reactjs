import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {likeScream, unlikeScream } from '../../redux/actions/dataActions'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import MyButton from '../../utils/MyButton'

const LikeButton = ({ screamId }) => {

    const dispatch = useDispatch()
    const likes = useSelector(state => state.user.likes)
    const authenticated = useSelector(state => state.user.authenticated)

    const ScreamLiked = () => {
        if (likes && likes.find((like) => like.screamId === screamId)) return true
        else return false
    }
    const like = () => (
        dispatch(likeScream(screamId))
    )
    const unlike = () => (
        dispatch(unlikeScream(screamId))
    )

    return (
        !authenticated ?
            (
                <MyButton tip="Like">
                    <Link to="/login">
                        <FavoriteBorder color="primary" />
                    </Link>
                </MyButton>
            ) : (
                ScreamLiked() ? (
                    <MyButton onClick={unlike} tip="Undo Like">
                        <Favorite color="primary" />
                    </MyButton>
                ) : (
                    <MyButton tip="Like" onClick={like} >
                        <FavoriteBorder color="primary" />
                    </MyButton>
                )
            )
    )
}
export default LikeButton
