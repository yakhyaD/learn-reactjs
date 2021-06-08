import React, { useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//MUI imports
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField'


//MUI icons
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { editDetails } from '../../redux/actions/userActions';
import editDetailsStyle from '../../styles/editDetailsStyle';
import MyButton from '../../utils/MyButton';

const EditDetails = () => {

    const classes = editDetailsStyle()
    const dispatch = useDispatch()
    const { bio, location, website } = useSelector(state => state.user.credentials)
    const [newBio, setBio ] = useState(bio)
    const [newLocation, setLocation ] = useState(location)
    const [newWebsite, setWebsite ] = useState(website)
    const [open, setOpen ] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const userDetails = {
            bio: newBio,
            website: newWebsite,
            location: newLocation
        }
        dispatch(editDetails(userDetails))
        setOpen(false)
    }
    return (
        <Fragment>
            <MyButton tip="Edit Details" onClick={handleOpen} BtnclassName={classes.button}>
                <EditIcon color="primary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>Edit your profile details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name='bio'
                            label="Bio"
                            type='text'
                            multiline
                            row='3'
                            className={classes.textField}
                            value={newBio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="A short bio about yourself"
                        />
                        <TextField
                            name='website'
                            label="Website"
                            type='text'
                            className={classes.textField}
                            value={newWebsite}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Enter your website"
                        />
                        <TextField
                            name='location'
                            label="Location"
                            type='text'
                            className={classes.textField}
                            value={newLocation}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter your location"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" >
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
        </Fragment>
    )
}

export default EditDetails