import React, { useEffect, useState } from 'react'
import netflixLogo from '../Images/Netflix_Logo_Print_OneColorPMS.webp'
import netflixAvatar from '../Images/0ddccae723d85a703b798a5e682c23c1.png'
import '../CSS_Component/Nav.css';

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else {
                handleShow(false)
            }

            return () => {
                window.removeEventListener("scroll");
            }
        })
    }, [])

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <img className="nav__logo"
                src={netflixLogo}
                alt='Netflix Logo'
            />
            <img className="nav__avatar"
                src={netflixAvatar}
                alt='Netflix Avatar'
            />
        </div>
    )
}

export default Nav;