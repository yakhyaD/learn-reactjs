import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { selectUser } from '../features/user/userSlice'

const Home = () => {
    const step = useSelector(selectUser)
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()
    const style = {
        background: `url(https://i.ibb.co/vXqDmnh/background.jpg) `,
        backgroundSize: "cover",
        height: "100vh"
    }
    const showDetails = (e) => {
        
        const target = e.target.parentNode.children[1]
        
        if(target.classList.contains('show')){
            target.classList.remove('show')
            return 
        }
        document.querySelectorAll('.list__items__details').forEach(item => {
            item.classList.remove('show')
        })
        
        target.classList.add('show')
        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        history.push({
            pathname: "/register",
            state: {email}
        })
    }
    return (
        <div>
            <Navbar />
            <div className="landing__page" style={style}>
                <div className="page__contents">
                    <h1 className="page__title">Unlimited movies, TV shows, and more.</h1>
                    <h2 className="page__subtitle">Watch anywhere. Cancel anytime.</h2>
                    <form className="page__form" onSubmit={handleSubmit}>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className="form__inputs">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email address"/>
                            <input required type="submit" value="Get Started >" />
                        </div>
                    </form>
                </div>
                <div className="section">
                    <div className="TV__text">
                        <h1>Enjoy on your TV</h1>
                        <h2>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
                    </div>
                    <div className="TV__animation">
                        {/* <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt=""/> */}
                        <div className="video">
                            <video src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" autoPlay playsInline muted loop></video>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="section2__left">
                        <div className="section2__left__img">
                            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt=""/>
                            <div className="section2__left__footer">
                                <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt=""/>
                                <div className="section2__left__footer__text">
                                    <div>Stranger Things</div>
                                    <div style={{color: "blue"}}>Dowloading...</div>
                                </div>
                                <div className="section2__left__svg">
                                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section2__right_text">
                        <h1>Download your shows to watch offline.</h1>
                        <h2>Save your favorites easily and always have something to watch.</h2>
                    </div>
                </div>
                <div className="section">
                    <div className="section3__left">
                        <h1>Enjoy on your TV</h1>
                        <h2>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
                    </div>
                    <div className="section3__right">
                        <div className="video">
                            <video src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" autoPlay playsInline muted loop></video>
                        </div>
                    </div>
                </div>
                <div className="section__ask">
                    <div className="section__center">
                    <h1>Frequently Asked Questions</h1>
                        <ul className="list">
                            <li className="list__items">
                                <button onClick={showDetails} className="list__items__head">
                                    What is Netflix?   
                                </button>
                                <p id="1" className="list__items__details">
                                    Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
                                    <br/>
                                    <br/>
                                    You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
                                </p>
                            </li>
                            <li className="list__items">
                                <button onClick={showDetails} className="list__items__head">
                                    How does Netflix cost?  
                                </button>
                                <p className="list__items__details">
                                    Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from USD7.99 to USD11.99 a month. No extra costs, no contracts.
                                </p>
                            </li>
                            <li className="list__items">
                                <button onClick={showDetails} className="list__items__head">
                                    How do I cancel?   
            
                                </button>
                                <p className="list__items__details">
                                    Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
                                </p>
                            </li>
                            <li className="list__items">
                                <button onClick={showDetails} className="list__items__head">
                                    What can I watch on Netflix?   
                                </button>
                                <p className="list__items__details">
                                    Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
                                </p>
                            </li>
                        </ul>
                    </div>
                    <form className="section3__page__form">
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className="form__inputs">
                            <input type="email" placeholder="Email address"/>
                            <input type="submit" value="Get Started >" />
                        </div>
                    </form>
                </div>
                <div className="section__contact">
                    <div className="section__contact__contents">
                        <div className="section__contact__title">
                            <a href="">Questions? Contact us.</a>
                        </div>
                        <div className="section__contact__lists">
                            <ul className="section__contact__contents__lists">
                                <li className="contact__list__items"><a href="">FAQ</a></li>
                                <li className="contact__list__items"><a href="">Investor Relationship</a></li>
                                <li className="contact__list__items"><a href="">Privacy</a></li>
                                <li className="contact__list__items"><a href="">Speed Test</a></li>
                            </ul>
                            <ul className="section__contact__contents__lists">
                                <li className="contact__list__items"><a href="">Help Center</a></li>
                                <li className="contact__list__items"><a href="">Jobs</a></li>
                                <li className="contact__list__items"><a href="">Cookie References</a></li>
                                <li className="contact__list__items"><a href="">Legal Notices</a></li>
                            </ul>
                            <ul className="section__contact__contents__lists">
                                <li className="contact__list__items"><a href="">Account</a></li>
                                <li className="contact__list__items"><a href="">Ways to Watch</a></li>
                                <li className="contact__list__items"><a href="">Corporate</a></li>
                                <li className="contact__list__items"><a href="">Netflix Originals</a></li>
                            </ul>
                            <ul className="section__contact__contents__lists">
                                <li className="contact__list__items"><a href="">Media Center</a></li>
                                <li className="contact__list__items"><a href="">Terms of Use</a></li>
                                <li className="contact__list__items"><a href="">Contact Us</a></li>
                            </ul>
                        </div>
                        <h3>Netfix Senegal</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home