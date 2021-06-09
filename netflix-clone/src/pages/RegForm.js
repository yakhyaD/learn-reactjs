import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import NavbarLog from '../components/NavbarLog'
import { auth } from '../firebase/firebaseConfig'
export const RegForm = () => {
    const location = useLocation()
    const history = useHistory()
    const [password, SetPassword] = useState("")
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    
    useEffect(() => {
        const {emailRef} = location.state
        if(emailRef){
            setEmail(emailRef)
        } else{
            setEmail('')
        }
    }, [])
    const signUp = async (e) => {
        e.preventDefault()
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            history.push('/signup')
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="reg__page">
            <NavbarLog/>
            <div className="reg__contents">
                <h2>STEP 1 OF 3</h2>
                <h3>Create a password to start your membership.</h3>
                <p>Just a few more steps and you're done!We hate paperwork, too.</p>
                <form onSubmit={signUp} className="register__form">
                    {error && <div className="error">{error}</div>}
                    <input onChange={e => setEmail(e.target.value)} value={email} className="reg__form__control" type="email" placeholder="Email"/>
                    <input value={password} onChange={e => SetPassword(e.target.value)} className="reg__form__control" type="password" placeholder="Password"/>
                    <div className="">
                        <input type="checkbox" id="checkbox"/>
                        <label htmlFor="checkbox">Please do not email me Netflix special offer</label>
                    </div>
                    <input className="reg__form__control" type="submit" value="Continue"/>
                </form>
            </div>
            <div className="register__contact">
                <h3>Questions? Contact us.</h3>
                <div className="register__bottom">
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
