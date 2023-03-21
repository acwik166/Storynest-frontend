import { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

import { MdAlternateEmail, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { BiKey } from 'react-icons/bi'

export default function Register() {
    const { user, register } = useContext(AuthContext)

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [regSuccess, setRegSuccess] = useState(false)
    const [timeLeft, setTimeLeft] = useState(5)

    const countdown = async () => {
        setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
    }

    const handleRegister = async () => {
        if (firstName === '' || lastName === '' || email === '' || password === '') return

        try {
            register(firstName, lastName, email, password)
            setRegSuccess(true)

            countdown()
            setTimeout(async () => {
                navigate('/login')
            }, 5000);
        } catch (error) {
            console.log(error)
        }
    }

    return (user ? <Navigate to="/" /> :
        <div className='login'>
            <div className="login__wrapper">
                <div className="login__text">
                    <h2>Storynest</h2>
                    <h1>Nice to see you!</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, praesentium.</p>
                </div>
                <div className="form">
                    <div className="input__icons">
                        <input type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <MdOutlineDriveFileRenameOutline className='icon' />
                    </div>
                    <div className="input__icons">
                        <input type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <MdOutlineDriveFileRenameOutline className='icon' />
                    </div>
                    <div className="input__icons">
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <MdAlternateEmail className='icon' />
                    </div>
                    <div className="input__icons">
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <BiKey className='icon' />
                    </div>
                    <button className='app-btn app-btn--accent' onClick={handleRegister}>Register</button>
                </div>
                <p className='redirect'>Already have an account? <Link to="/login">Login</Link></p>
                {regSuccess ? <div className='reg-msg'>Successfully registered. Redirecting to login in {timeLeft}</div> : ''}
            </div>
        </div>
    )
}
