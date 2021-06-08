import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, postScream } from '../../redux/actions/dataActions'

//MUI imports
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CircularProgress from '@material-ui/core/CircularProgress'


//MUI Icons
import { Button } from '@material-ui/core';
import MyButton from '../../utils/MyButton'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close';

const style = makeStyles({
    dialog: {
        position: 'relative',
        padding: '15'
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        left: '90%'
    },
    textField: {
        width: '70%',
        margin: '10px auto 10px auto',
        color: "primary"
    },
    loading: {
        position: 'absolute',
        padding: '5 auto 5 auto',
        marginBottom: 15
    },
    button: {
        postion: 'relative',
        margin: '15px auto 15px auto',
    },
    form: {
        width: '100%',
    },
})

const PostScream = () => {
    const classes = style()
    const [open, setOpen ] = useState(false)
    const [body, setBody] = useState('')
    const loading = useSelector(state => state.UI.loading ?? false)
    const { error } = useSelector(state => state.UI.errors ?? "")

    const dispatch = useDispatch()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        dispatch(clearErrors())
        setOpen(false)
    }
    const handlePost = (e) => {
        e.preventDefault()
        dispatch(postScream({ body: body }))
        if (!loading) {
            setOpen(false)
        }
    }
    return (
        <Fragment>
            <MyButton tip="Post a scream" onClick={handleOpen}>
                <AddIcon />
            </MyButton>
            <Dialog open={open} className={classes.dialog} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>Post a scream</DialogTitle>
                <MyButton tip="Home" onClick={handleClose} BtnclassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogContent>
                    <form onSubmit={handlePost} className={classes.form}>
                        <TextField
                            name='Postscream'
                            label="New Scream"
                            type='text'
                            multiline
                            rowsMax={4}
                            className={classes.textField}
                            value={body}
                            helperText={error}
                            error={error ? true : false}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="What's happening !!!"
                        />
                        <br/>
                        <Button className={classes.button}
                            disabled={loading}
                            type="submit"
                            variant="contained"
                            color="primary">
                            {loading && <CircularProgress size={20} className={classes.loading} /> } Post
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default PostScream
