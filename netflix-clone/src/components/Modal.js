import React from 'react'
import { useHistory } from 'react-router'
import '../css/components/Modal.css'

export const Modal = () => {
    const history = useHistory()
    const handlePlan = () => {
        history.push("/signup/payment")
    }
    return (
        <div className="backdrop">
            <div className="backdrop__contents">
                <div className="modal__logo"></div>
                <h1 alt="enlarged title">You are getting an update!</h1>
                <div>
                    Enjoy Standard during your first 30 days for no additional charge. Watch in Full HD (1080p).
                    <ul className="offers">
                        <li>
                            <h3>FIRST 30 DAYS</h3>
                            <h2><span>USD7.99</span>    USD7.99</h2>
                            <small>Standard Plan</small>
                        </li>
                        <li>
                            <h3>AFTER 30 DAYS</h3>
                            <h2>USD7.99/months</h2>
                            <small>Basic Plan</small>
                        </li>
                    </ul>
                </div>
                <button onClick={handlePlan}>OK</button>
            </div>
        </div>
    )
}
