import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Spinner from './Spinner'

export default function PrivateRoute() {
    const { user } = useContext(AuthContext)

    if (user === undefined) {
        return <Spinner />
    }

    return (
        user ? <Outlet /> : <Navigate to="/login" replace />
    )
}
