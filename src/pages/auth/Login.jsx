import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ToastContainer } from 'react-toastify';
import { notifyError, notifyWarning, notifySuccess } from '../../utilities/messageFunctions.js';

import { MdAlternateEmail } from 'react-icons/md'
import { BiKey } from 'react-icons/bi'

export default function Login() {
    const { user, login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleLogin = async () => {
        try {
            if (email == '' || password == '') {
                notifyWarning('Please input email and password.')
                return
            }
            login(email, password, setError)
            if (error) {
                notifyError('Bad email or password. Try again.')
                return
            }
            notifySuccess('Success! You logged in.')
            return <Navigate to="/" />
        } catch (e) {
        }
    }


    return (user ? <Navigate to="/" /> :
        <div className='login'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="login__wrapper">
                <div className="login__text">
                    <h2>Storynest</h2>
                    <h1>Hello again!</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, praesentium.</p>
                </div>
                <div className="form">
                    <div className="input__icons">
                        <input type="email" placeholder='Email' value={email} onInput={(e) => setEmail(e.target.value)} />
                        <MdAlternateEmail className='icon' />
                    </div>
                    <div className="input__icons">
                        <input type="password" placeholder='Password' value={password} onInput={(e) => setPassword(e.target.value)} />
                        <BiKey className='icon' />
                    </div>
                    <button className='app-btn app-btn--accent' onClick={handleLogin}>Login</button>
                </div>
                <p className='redirect'>Don't have an account yet? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}
