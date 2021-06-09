import React, { useEffect, useState } from 'react'
import logo from './images/netflix_logo.png'
import avatar from './images/avatar.png'
import '../App.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'

const Navbar = () => {
    const user = useSelector(selectUser)
    const [show, setShow] = useState(false)
    const handleScroll = (e) => {

        if (window.scrollY > 100) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return window.removeEventListener('scroll', handleScroll)
    }, [])

    const SignInStyle = {
        backgroundColor: 'red',
        padding: "8px",
        borderRadius: "5px",
        fontSize: "14px",
        color: "white",
        width: "50px"
    }
    return (
        <div className={`nav ${show && "nav__dark"}`}>
            <div className="nav__contents">
                <a href="/"><img className="nav__logo" src={logo} alt="logo netflix" /></a>
                {user ?
                    <img className="nav__avatar" src={avatar} alt="logo netflix" />

                    : <a style={SignInStyle} className="nav__avatar sign_in_btn" href="/login">Sign in</a>

                }
            </div>
        </div>
    )
}

export default Navbar
