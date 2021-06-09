import React, { useEffect, useState } from 'react'
import { Modal } from '../components/Modal'
import NavbarLog from '../components/NavbarLog'
import '../css/pages/Plans.css'
export const Plans = () => {
    const [fixed, setFixed] = useState(false)
    const [plan, setPlan] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const choosePlan = (e) => {

        const target = e.target
        if (target.classList.contains('choosen')) {
            target.classList.remove('choosen')
            return
        }
        document.querySelectorAll('.plans__type').forEach(item => {
            item.classList.remove('choosen')
        })
        setPlan((Array.from(target.classList))[1])
        target.classList.add('choosen')
    }
    const handleScroll = (e) => {
        console.log("scrolled")
        if (window.scrollY > 100) {
            console.log("aeara");
            setFixed(true)
        } else {
            setFixed(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return window.removeEventListener('scroll', handleScroll)
    }, [fixed])


    return (
        <div class={`${showModal && "dark__grey"}`}>
            { !showModal && <NavbarLog />}
            <div className="plans__head">
                <h3>STEP <strong>1</strong> OF <strong>3</strong></h3>
                <h2>Choose the plan that right to you.</h2>
                <ul className="planform__list">
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
            <div className="plans">
                <div className={`plans__types ${fixed && "fixed"}`}>
                    <div onClick={choosePlan} className="plans__type basic__plan">Basic</div>
                    <div onClick={choosePlan} className="plans__type standard__plan">Standard</div>
                    <div onClick={choosePlan} className="plans__type premium__plan">Premium</div>
                </div>
                <div className="plans__details">
                    <div className="plans__prices">
                        <div className="plan__title">Monthly price</div>
                        <div className="plan__table">
                            <div className="plan__price ">USD7.99</div>
                            <div className="plan__price ">USD9.99</div>
                            <div className="plan__price ">USD11.99</div>
                        </div>
                    </div>
                    <div className="plans__video">
                        <div className="plan__title">Video quality</div>
                        <div className="plan__table">
                            <div className="plan__video  ">Good</div>
                            <div className="plan__video  ">Better</div>
                            <div className="plan__video  ">Best</div>
                        </div>
                    </div>
                    <div className="plans__resolution">
                        <div className="plan__title">Resolution</div>
                        <div className="plan__table">
                            <div className="plan__resolution ">480p</div>
                            <div className="plan__resolution ">1080p</div>
                            <div className="plan__resolution ">4K+HDR</div>
                        </div>
                    </div>
                    <div className="plans__cell">
                        <div className="plan__title">Watch on your TV, computer, mobile phone and tablet</div>
                        <div className="plan__table">
                            <div className="plan__cell "> <svg viewBox="0 0 24 24" className="check__icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg></div>
                            <div className="plan__cell "> <svg viewBox="0 0 24 24" className="check__icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg></div>
                            <div className="plan__cell "> <svg viewBox="0 0 24 24" color="grey" className="check__icon" aria-hidden="true"><path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path></svg></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="plans__footer">
                <small>
                    Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content available in HD, Full HD, Ultra HD or HDR. See <a href="/terms">Terms of Use</a> for more details.
                </small>
                <small>
                    Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.
                </small>
            </div>
            <button className="next__step" onClick={() => setShowModal(true)}>Continue</button>
            <div className="register__contact">
                <h3>Questions? Contact us.</h3>
                <div className="register__bottom">
                    <ul className="section__contact__contents__lists">
                        <li className="contact__list__items"><a href="/faq">FAQ</a></li>
                        <li className="contact__list__items"><a href="/preferences">Cookie Preferences</a></li>
                    </ul>
                    <ul className="section__contact__contents__lists">
                        <li className="contact__list__items"><a href="/help">Help Center</a></li>
                        <li className="contact__list__items"><a href="/CorpInf">Corporate Information</a></li>
                    </ul>
                    <ul className="section__contact__contents__lists">
                        <li className="contact__list__items"><a href="/terms">Terms of Use</a></li>
                    </ul>
                    <ul className="section__contact__contents__lists">
                        <li className="contact__list__items"><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            {showModal && <Modal plan={plan} />}
        </div>
    )
}
