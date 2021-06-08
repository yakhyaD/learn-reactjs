import React, { useState } from 'react'
import { commentScream } from '../../redux/actions/dataActions'

//Redux Stuff
import { useDispatch, useSelector } from 'react-redux'

//MUI Stuff
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import makeStyles from '@material-ui/core/styles/makeStyles'

const commentStyle = makeStyles({
    button: {
        marginTop: 8
    }
})

const CommentForm = ({ screamId }) => {
    const classes = commentStyle()
    const dispatch = useDispatch()
    const [body, setBody] = useState('')
    const authenticated = useSelector(state => state.user.authenticated )
    const loading = useSelector(state => state.data.loadingCom)
    const {error} = useSelector(state => state.UI.errors ?? '')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(commentScream(screamId, { body }))
        setBody('')
    }

    const FormMarkup = authenticated ? (
        <Grid item sm={12} style={{textAlign: 'center'}}>
            <form noValidate className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    name='comment'
                    label="Leave a comment !!"
                    type='text'
                    placeholder=""
                    helperText={error}
                    className={classes.textField}
                    value={body}
                    error={error ? true : false}
                    onChange={(e) => setBody(e.target.value)}
                    fullWidth
                />
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}>{loading && <CircularProgress size={20} className={classes.loading} />}Comment
                </Button>
            </form>
        </Grid>
    ) : null

    return FormMarkup
}

export default CommentForm
