import { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'

import { AuthContext } from '../context/AuthContext'

export default function Header() {
    const { user } = useContext(AuthContext)

    const [showNavbar, setShowNavbar] = useState()

    return (
        <>
            <header>
                <div className="header__wrapper">
                    <div className="header__top">
                        <div className="header__logo">
                            <h1><Link to="/">Storynest</Link></h1>
                        </div>
                        <div className="burger" onClick={() => setShowNavbar(prev => !prev)}></div>
                    </div>
                    <nav className={`nav ${showNavbar ? 'nav--show' : ''}`}>
                        <ul>
                            <li><Link to="/articles">Articles</Link></li>
                            <li><Link to="/write">Write</Link></li>
                        </ul>
                        <div className="header__auth">
                            {user ?
                                <>
                                    <p><AiOutlineUser className='user-icon' /><Link to="/user">Hello {user.user.first_name}!</Link></p>
                                    <button className='app-btn app-btn--accent'><Link to="/logout">Logout</Link></button>
                                </> :
                                <>
                                    <button className='app-btn'><Link to="/login">Login</Link></button>
                                    <button className='app-btn app-btn--accent'><Link to="/register">Sign up</Link></button>
                                </>
                            }
                        </div>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    )
}
