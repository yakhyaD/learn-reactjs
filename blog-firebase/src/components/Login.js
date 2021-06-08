import { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../context/UserContext"


const Login = () => {
    const history = useHistory()
    const email = useRef()
    const password = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

     const handleSubmit = async (e) => {
         e.preventDefault()
         try {
             setError('')
             setLoading(true)
             await login(email.current.value, password.current.value)
             history.push('/')
             
         } catch (error) {
             setLoading(false)
             setError(error.message)
         }        
    }

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                {error && <div className="alert-danger">{error}</div>}
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        required
                        type="email"
                        ref={email}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        required
                        autoComplete={password}
                        type="password"
                        ref={password}
                    />
                </div>
                <input disabled={loading} className="btn" type="submit" value="Register" />
            </form>
            <Link to='/register'>
                Register
            </Link>
        </div>
    )
}
export default Login