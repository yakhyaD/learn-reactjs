import React, { Fragment } from 'react'
import profileStyle from '../../styles/profileStyle'
import EditDetails from './EditDetails'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'
import { useRef } from 'react'

// MUI imports
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// MUI Icons
import LocationIcon from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import MyButton from '../../utils/MyButton'


const ProfileUser = () => {
    dayjs.extend(relativeTime)
    const classes = profileStyle()
    const imageInput = useRef()
    const { bio, location, handle, website, imageUrl, createdAt } = useSelector(state => state.user.credentials ?? {})
    const loading = useSelector(state => state.user.loading)
    const loadingUI = useSelector(state => state.UI.loading)
    const authenticated  = useSelector(state => state.user.authenticated)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleImage = (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        dispatch(uploadImage(formData))
    }
    const handleAddPicture = () => {
        imageInput.current.click()
    }
    const handleLogout = () => {
        dispatch(logoutUser())
        history.push('/')
    }
    const MarkupProfile = !(loading | loadingUI) ? (authenticated ?
        profile(handle, imageUrl, website, location, bio, createdAt, classes, handleImage, handleAddPicture, imageInput, handleLogout) : noProfile(classes))
        : Loading

    return (MarkupProfile)
}

const profile =
    (handle, imageUrl, website, location, bio, createdAt, classes, handleImage, handleAddPicture, imageInput, handleLogout) =>
        (<Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="ProfileImage" className="profile-image" />
                    <input type="file" onChange={handleImage} hidden="hindden" ref={imageInput} />
                    <MyButton tip="Edit Profile Picture" onClick={handleAddPicture} BtnclassName={classes.fab}>
                        <EditIcon color="primary" />
                    </MyButton>
                </div>
                <hr />
                 <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {website && (
                        <Fragment>
                            <LocationIcon color="primary"/><span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" /><a href={website} alt='_blank' rel='nooponer norefferer'>{'  '}{website}</a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarIcon color="primary" />{'  '}
                    <span>Join {dayjs(createdAt).fromNow()}</span>
                    </div>
                    <MyButton tip="Logout" onClick={handleLogout} BtnclassName={classes.fab}>
                        <KeyboardReturn color="primary" />
                    </MyButton>
                    <EditDetails />
            </div>
        </Paper>)
const noProfile = (classes) => (
    <Paper className={classes.paper}>
        <Typography variant="body1" align="center">
            No profile found. Please Login
        </Typography>
        <div className={classes.buttons}>
            <Button component={Link} color="primary" variant="contained" to='/login'>Login</Button>
            <Button component={Link} color="secondary" variant="contained" to='/signup'>Signup</Button>
        </div>
    </Paper>)
const Loading = <div><Typography variant="body1">Loading...</Typography></div>

export default ProfileUser
