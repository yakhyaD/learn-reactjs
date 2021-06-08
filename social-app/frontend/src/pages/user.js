import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'
import Scream from '../components/scream/Scream'
import ProfileUser from '../components/profile/ProfileUser'

//MUI Stuff
import Grid from '@material-ui/core/Grid'

const User = (props) => {
    const handle = props.match.params.handle
    const dispatch = useDispatch()
    const screams = useSelector(state => state.data.screams)
    const loading = useSelector(state => state.data.loading)

    useEffect(() => {
        dispatch(getUserData(handle))
    }, [dispatch, handle]) 

    const ScreamsMarkup = !loading ? (screams.map(scream =>  <Scream key={scream.screamId} scream={scream} />)) : ("Loading")
    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {ScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <ProfileUser  />
            </Grid>
        </Grid>
    )
}

export default User