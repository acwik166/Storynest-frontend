import { useEffect, useContext } from 'react'
import { Navigate } from "react-router-dom";

import { AuthContext } from '../../context/AuthContext';

export default function Logout() {
    const { logout, user } = useContext(AuthContext)

    useEffect(() => {
        logout(user)
    })

    return (
        <Navigate to="/login" replace={true} />
    )
}
