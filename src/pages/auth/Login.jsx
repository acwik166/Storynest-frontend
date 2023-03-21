import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import { MdAlternateEmail } from 'react-icons/md'
import { BiKey } from 'react-icons/bi'

export default function Login() {
    const { user, login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            login(email, password)
            return <Navigate to="/" />

        } catch (error) {
            console.log('error')
        }
    }

    return (user ? <Navigate to="/" /> :
        <div className='login'>
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
