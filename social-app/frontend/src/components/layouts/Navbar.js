import '../../App.css'
import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useSelector } from 'react-redux'
import MyButton from '../../utils/MyButton'
import PostScream from '../scream/PostScream'

// MUI icons
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Button } from '@material-ui/core'


const Navbar = () => {
    const authenticated = useSelector(state => state.user.authenticated)


    return (
        <AppBar>
            <Toolbar className="nav_container">
                {authenticated ? (
                    <Fragment>
                        <PostScream />
                        <Link to='/'>
                            <MyButton tip="Home">
                                <HomeIcon />
                            </MyButton>
                        </Link>
                        <MyButton tip="Notifications">
                            <NotificationsIcon  />
                        </MyButton>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button color="inherit" component={Link} to='/'>Home</Button>
                        <Button color="inherit" component={Link} to='/login'>Login</Button>
                        <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                    </Fragment>
                )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
