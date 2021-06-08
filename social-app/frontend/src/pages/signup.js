import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import logo from '../images/senegal.png'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress'
import useStyles from '../styles/useStyles'


const Signup = () => {
    const classes = useStyles()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [handle, setHandle] = useState('')

    const userCredentials = { email, password, confirmPassword, handle }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})
        axios.post('http://localhost:5000/shin-socialapp/us-central1/api/register', userCredentials)
        .then((res) => {
            setLoading(false)
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setHandle('')
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            history.push('/')
        })
        .catch(error => {
            console.log(error.response.data)
            setErrors(error.response.data)
            setLoading(false)
        })
    }
    return (
        <Container className={classes.container}  maxWidth="sm">
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography className={classes.title} variant='h3' color='primary' >Login</Typography>
            <form noValidate className={classes.form} onSubmit={handleSubmit}>
                {errors.error && <Typography className={classes.eroor}  color='red' >{errors.error}</Typography>}
                <TextField
                    name='email'
                    label="Email"
                    placeholder="Enter your email address"
                    helperText={errors.email}
                    className={classes.textField}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email ? true : false}
                />
                <TextField
                    name='handle'
                    label="Handle"
                    placeholder="Enter your handle"
                    helperText={errors.email}
                    className={classes.textField}
                    onChange={(e) => setHandle(e.target.value)}
                    error={errors.email ? true : false}
                />
                <TextField
                    name='password'
                    type='password'
                    label="Password"
                    placeholder="Enter your password"
                    helperText={errors.password}
                    className={classes.textField}
                    error={errors.email ? true : false}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    name='confirmPassword'
                    type='password'
                    label="Confirm Password"
                    placeholder="Enter your password"
                    helperText={errors.password}
                    className={classes.textField}
                    error={errors.email ? true : false}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br/>
                <Button className={classes.button} type="submit" variant="contained" color="primary">
                    {loading ? <CircularProgress className={classes.loading} /> : 'Signup'}
                </Button>
                <br />
                <small>Already have a account ? Login <Link className={classes.link} to="/login">here</Link></small>
                <br/><br/>
            </form>
        </Container>
    )
}
export default Signup