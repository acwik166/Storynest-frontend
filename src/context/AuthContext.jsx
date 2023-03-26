import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    // refresh token every 4 minutes
    setInterval(async () => {
        if (user == null) return
        const res = await fetch('https://storynestbackend-production.up.railway.app/api/auth/refresh', {
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`
            },
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                token: user.refreshToken
            })
        })
        const data = await res.json()
        setUser(prev => ({ ...prev, accessToken: data.accessToken }))
    }, 240000)

    useEffect(() => {
        const fetchUser = async () => {
            const loggedInUser = localStorage.getItem('auth-user') || null

            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser))
            }
        }
        fetchUser()
    }, [])

    const login = async (email, password) => {
        try {
            const res = await fetch('https://storynestbackend-production.up.railway.app/api/auth/login',
                {
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })

            const data = await res.json()
            setUser(data)
            localStorage.setItem('auth-user', JSON.stringify(data))
        } catch (error) {
            if (error.toString().includes('Unauthorized')) {
                console.log('not authorized')
            }
        }
    }

    const register = async (firstName, lastName, email, password) => {
        const res = await fetch('https://storynestbackend-production.up.railway.app/api/auth/register',
            {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                })
            })
    }

    const logout = async (user) => {
        const res = await fetch('https://storynestbackend-production.up.railway.app/api/auth/logout',
            {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.accessToken}`
                },
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    token: user.refreshToken
                })
            })

        setUser(null)
        localStorage.clear()
    }

    return <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
    </AuthContext.Provider>
}