import React from 'react'
import NavbarLog from '../components/NavbarLog'

export const ChoosePlans = () => {
    return (
        <div className="reg__page">
            <NavbarLog />
            <div className="plans__contents">
                <div className="plans__logo"></div>
                <h3>STEP <strong>1</strong> OF <strong>3</strong></h3>
                <h2>Choose your plan.</h2>
                <div className="plans__list">
                    <ul>
                        <li className="plans__items">
                            <svg viewBox="0 0 24 24" className="check__icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                            <span>No commitments, cancel anytime.</span>
                        </li>
                        <li className="plans__items">
                            <svg viewBox="0 0 24 24" className="check__icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                            <span>Everything on Netflix for one low price.</span>
                        </li>
                        <li className="plans__items">
                            <svg className="check__icon" aria-hidden="true"><path fill="red" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg>
                            <span>Unlimited viewing on all your devices.</span>
                        </li>
                    </ul>
                </div>
                <a href="/plans">See the plans</a>
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
