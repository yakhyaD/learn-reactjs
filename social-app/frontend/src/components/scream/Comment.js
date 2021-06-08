import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

//MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

const commentStyle = makeStyles({
    profile: {
        minWidth: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%',
        marginTop: 3

    },
    separator: {
        border: 'none',
        margin: 2
    },
    content: {
        marginLeft: 25,
        marginTop: 5
    },
    visibleSeparator: {
        border: '1 solid #000',
        margin: "5 auto 5 auto"
    }
})

const Comment = ({ comments }) => {
    const classes = commentStyle()

    return (
        <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, handle, imageUrl } = comment
                return (
                    <Fragment>
                        <Grid item sm={12}>
                            <Grid container >
                                <Grid item sm={2}>
                                    <img src={imageUrl} alt="UserProfile" className={classes.profile} />
                                </Grid>
                                <Grid item sm={9} className={classes.content}>
                                    <Typography variant="h5" color="primary" component={Link} to={`/users/${handle}`}>
                                        {handle}
                                    </Typography>
                                    <hr className={classes.separator} />
                                    <Typography variant="body2" color="textSecondary">
                                        {dayjs(createdAt).format('h:mm, s, MMMM DD YYYY')}
                                    </Typography>
                                    <hr className={classes.separator} />
                                    <Typography  variant="body1" >
                                        {body}
                                    </Typography>
                                </Grid>
                            </Grid>
                        {index !== comments.length - 1 && <hr className={classes.visibleSeparator} />}
                        </Grid>
                    </Fragment>
                )
            })
            }
        </Grid>
    )
}

export default Comment
