import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Scream from '../components/scream/Scream'
import ProfileUser from '../components/profile/ProfileUser'
import { useDispatch, useSelector } from 'react-redux'
import { getAllScreams } from '../redux/actions/dataActions'

const Home = () => {
    const screams = useSelector(state => state.data.screams)
    const loading = useSelector(state => state.data.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllScreams())
    }, [dispatch])

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
export default Home
