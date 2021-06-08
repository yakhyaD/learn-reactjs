import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'


const AuthRoute = ({ component: Component, ...rest }) => {

    const authenticated = useSelector(state => state.user.authenticated)

    return (
        <Route
            {...rest}
            render={(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props} /> }

        />
    )
}

export default AuthRoute
