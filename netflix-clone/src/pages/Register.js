import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import NavbarLog  from '../components/NavbarLog'

export const Register = () => {
    const location = useLocation()
    const history = useHistory()
    const [emailRef, setEmail] = useState('')
    
    useEffect(() => {
        const {email} = location.state
        setEmail(email)
    }, [])
    const handleClick = () => {
        history.push({
            pathname: '/regform',
            state: {emailRef: emailRef}
        })
    }
    return (
        <div>
            <NavbarLog /> 
            <div className="register__page">
                <div className="register__contents">
                    <div className="register__head"></div>
                    <h3>STEP 1 OF 3</h3>
                    <h1>Finish setting up your account.</h1>
                    <p>Netflix is personalized for you. Create a password to watch Netflix on any device at any time.</p>
                    <a onClick={handleClick}>Continue</a>
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
        </div>
    )
}
