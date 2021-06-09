import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectStep } from '../features/user/userSlice';
import { auth } from "../firebase/firebaseConfig";

export const Login = () => {
    const step = useSelector(selectStep)

    const style = {
        background: `url(https://i.ibb.co/vXqDmnh/background.jpg) `,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        minHeight: "100vh"
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const [error, setError] = useState('')

    const login = async (e) => {
        e.preventDefault()
        try {
            await auth.signInWithEmailAndPassword(email, password)
            if (step) {
                history.push('/')
                setError('')
            } else {
                history.push('/signup/planform')
                setError('')
            }
        } catch (error) {
            setError(error.message)
            // console.log(error.message)
        }

    }
    return (
        <div>
            <div className="login__page" style={style}>
                <div className="login__contents">
                    <form onSubmit={login} className="login__form">
                        {error && <div className="error">{error}</div>}
                        <h1>Sign In</h1>
                        <input onChange={e => setEmail(e.target.value)} value={email} className="form__control" type="email" placeholder="Email address" />
                        <input onChange={e => setPassword(e.target.value)} value={password} className="form__control" type="password" placeholder="Password" />
                        <input className="form__control" type="submit" value="Sign In" />
                        <div className="login__help">
                            <div>
                                <input defaultChecked type="checkbox" />   Remember me
                            </div>
                            <a href="">Need help?</a>
                        </div>
                        <div className="login__footer">
                            <div className="login__fb">
                                <img src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png" alt="" />
                                <span>Login with Facebook</span>
                            </div>
                            <div className="login__register">
                                <h3>New to Netflix? <a href="/">Sign up now</a></h3>
                                <p>
                                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href=""><span>Learn more.</span></a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="login__bottom">
                    <ul className="section__contact__contents__lists">
                        <li className="contact__list__items"><a href="">FAQ</a></li>
                        <li className="contact__list__items"><a href="">Cookie Preferences</a></li>
                    </ul>
                    <ul className="section__contact__contents__lists">
                        <li className="contact__list__items"><a href="">Help Center</a></li>
                        <li className="contact__list__items"><a href="">Corporate Information</a></li>
                    </ul>
                    <ul className="section__contact__contents__lists">
                        <li className="contact__list__items"><a href="">Terms of Use</a></li>
                    </ul>
                    <ul className="section__contact__contents__lists">
                        <li className="contact__list__items"><a href="">Privacy</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
