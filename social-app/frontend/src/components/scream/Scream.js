import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ScreamDialog from './Screamdialog'
import { useSelector } from 'react-redux';
import LikeButton from './LikeButton'

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles'
import MyButton from '../../utils/MyButton'

//MUI icons
import ChatIcon from '@material-ui/icons/Chat'
import DeleteScream from './DeleteScream';


const useStyles = makeStyles({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    media: {
        minWidth: 200,
        objectFit: 'cover',
    },
    content: {
        padding: 40
    }
})

const Scream = ({ scream }) => {
    const classes = useStyles()
    dayjs.extend(relativeTime)
    const { userImage, userHandler, createdAt, body, screamId } = scream
    const { likeCount, commentCount } = useSelector((state) => state.data.screams.filter((scream) => scream.screamId === screamId)[0] ?? 0)
    const  { handle } = useSelector((state) => state.user.credentials ?? {})
    const authenticated = useSelector(state => state.user.authenticated)


    const deleteButton = authenticated && handle === userHandler ? <DeleteScream screamId={screamId} /> : null

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={userImage}
                title="Profile Image"
            />
            <CardContent className={classes.content}>
                <Typography
                    variant="h5" color="primary"
                    component={Link}
                    to={`/users/${userHandler}`} >
                    {userHandler}
                </Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} comments</span>
                <ScreamDialog screamId={screamId} />
            </CardContent>
        </Card>
    )
}
export default Scream
