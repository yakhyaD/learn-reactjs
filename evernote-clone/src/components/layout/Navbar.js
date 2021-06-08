import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="green">
            <div className="nav">
                <a href="/" className="brand-logo left">CRUD</a>
                <ul id="nav-mobile" className="right brand">
                    <NavLink to="/favorites">Favorite Note</NavLink>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
