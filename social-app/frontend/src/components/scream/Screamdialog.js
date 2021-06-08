import React, { useState, Fragment } from 'react'
import ScreamDialogStyle from '../../styles/ScreamDialogStyle';
import MyButton from '../../utils/MyButton'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import Comment from './Comment'
import CommentForm from './CommentForm';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

//MUI Stuff
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress'
import LikeButton from './LikeButton'

//MUI Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import CloseIcon from '@material-ui/icons/CloseOutlined'
import ChatIcon from '@material-ui/icons/Chat'

//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';





const Screamdialog = ({ screamId }) => {

    const classes = ScreamDialogStyle()
    const dispatch = useDispatch()
    const [open, setOpen ] = useState(false)
    const loading = useSelector(state => state.UI.loading)
    const { userImage, userHandler, createdAt, body, likeCount, commentCount, comments  } = useSelector(state => state.data.scream)

    const handleOpen = () => {
        setOpen(true)
        dispatch(getScream(screamId))
    }
    const handleClose = () => {
        setOpen(false)
        dispatch(clearErrors())
    }
    const DialogMarkup = loading ? (
        <div className={classes.loading}>
            <CircularProgress size={200} />
        </div>
    ) : (
            <Grid container >
                <Grid item sm={12}>
                    <Grid container spacing={3}>
                        <Grid item sm={5} xs={12}>
                            <img src={userImage} alt="ProfileImage" className={classes.profile} />
                        </Grid>
                        <Grid item sm={7} xs={12}>
                            <Typography component={Link} to={`/user/${userHandler}`} variant="h5" color="primary">
                                @{userHandler}
                            </Typography>
                            <hr className={classes.separator} />
                            <Typography variant="body2" color="textSecondary">
                                {dayjs(createdAt).format('h:mm, s, MMMM DD YYYY')}
                            </Typography>
                            <hr className={classes.separator} />
                            <Typography  variant="body1" >
                                {body}
                            </Typography>
                            <LikeButton screamId={screamId} />
                            <span>{likeCount} likes</span>
                            <MyButton tip="comments">
                                <ChatIcon color="primary" />
                            </MyButton>
                            <span>{commentCount} comments</span>
                        </Grid>
                    </Grid>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm screamId={screamId} />
                <Comment comments={comments}/>
            </Grid>
    )
    return (
        <Fragment>
            <MyButton tip="Scream Dialog" onClick={handleOpen} tipClassName={classes.expandButton}>
                <UnfoldMore color="primary" />
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth='sm'
            >
                <DialogContent className={classes.dialogContent}>
                    <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    {DialogMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default Screamdialog
