import React from 'react'
import NavbarLog from '../components/NavbarLog'

export const PlansForm = () => {
    return (
        <div>
            <NavbarLog />
            <div className="planform__contents">
                <div className="planform__logo"></div>
                <h3>STEP 1 OF 3</h3>
                <h2>Choose your plan.</h2>
                <div className="planform__list">
                    <ul>
                        <li className="planform__items">
                            <svg viewBox="0 0 24 24" className="check__icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                            <span>Watch all you want. Add-free.</span>
                        </li>
                        <li className="planform__items">
                            <svg viewBox="0 0 24 24" className="check__icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                            <span>Recommendations just for you.</span>
                        </li>
                        <li className="planform__items">
                            <svg className="check__icon" aria-hidden="true"><path fill="red" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                            <span>Change or cancel your plan anytime.</span>
                        </li>
                    </ul>
                </div>
                <div className="planform__offer">
                    <div className="basic__offer">Basic</div>
                    <div className="standard__offer">Standard</div>
                    <div className="premium__offer">Premium</div>
                </div>
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
