import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import useStyles from '../styles/useStyles'
import logo from '../images/senegal.png'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { loginUser } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loading = useSelector(state => state.UI.loading)
    const errors  = useSelector(state => state.UI.errors)
    const userData = { email, password }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(userData, history))
    }
    return (
        <Container className={classes.container}  maxWidth="sm">
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography className={classes.title} variant='h3' color='primary' >Login</Typography>
            <form noValidate className={classes.form} onSubmit={handleSubmit}>
                {errors.error && <Typography variant='body2' className={classes.error} >{errors.error}</Typography>}
                <TextField
                    name='email'
                    label="Email"
                    type='email'
                    placeholder="Enter your email address"
                    helperText={errors.email}
                    className={classes.textField}
                    error={errors.email ? true : false}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type='password'
                    name='password'
                    label="Password"
                    placeholder="Enter your password"
                    helperText={errors.password}
                    className={classes.textField}
                    error={errors.password ? true : false}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>

                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}>{loading && <div className={classes.loading}>
                        <CircularProgress size={20} />
                    </div>}
                    Login
                </Button>

                <br />
                <small>Don't have a account. Signup <Link className={classes.link} to="/signup">here</Link></small>
                <br/><br/>
            </form>
        </Container>
    )
}
export default Login