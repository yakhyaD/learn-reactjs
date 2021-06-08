import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';

//MUI icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import editDetailsStyle from '../../styles/editDetailsStyle';
import MyButton from '../../utils/MyButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';


const DeleteScream = ({ screamId }) => {

    const classes = editDetailsStyle()
    const dispatch = useDispatch()
    const [open, setOpen ] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch(deleteScream(screamId))
        setOpen(false)
    }

    return (
        <Fragment>
            <MyButton tip="Delete Scream" onClick={handleOpen} BtnclassName={classes.deleteButton}>
                <DeleteOutline color="secondary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>Edit your profile details</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" >
                        Delete
                    </Button>
                </DialogActions>

            </Dialog>
        </Fragment>
    )
}

export default DeleteScream
