import React from 'react'
import logo from './images/netflix_white.png'
import { useLocation } from "react-router-dom";
const NavbarLog = () => {
    const location = useLocation()
    const SignInStyle = {
        backgroundColor: 'red',
        padding: "10px",
        borderRadius: "5px",
        fontSize: "16px",
        color: "white"
    }
    return (
        <div className={`navlog`}>
            <div className="navlog__contents">
                <a href="/"><img className="navlog__logo" src={logo} alt="logo netflix" /></a>
                {location.pathname === "/" ?
                    <a style={SignInStyle} href="/login">Sign In</a>
                    : <a href="/logout">Sign Out</a>
                }

            </div>
        </div>
    )
}
export default NavbarLog
