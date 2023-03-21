import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import headers from '../utilities/fetchOptions'

export default function UserEdit() {
    const { user } = useContext(AuthContext)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')

    const handleEdit = async () => {
        if (password == '' || oldPassword == '' || retypePassword == '') return

        if (password !== retypePassword) return

        try {
            console.log(user.user._id)
            const res = await fetch(`http://localhost:3001/api/auth/${user.user._id}`, {
                headers: headers(user.accessToken), body: JSON.stringify({
                    first_name: firstName == '' ? user.user.first_name : firstName,
                    last_name: lastName == '' ? user.user.last_name : lastName,
                    email: email == '' ? user.user.email : email,
                    password: password,
                    old_password: oldPassword
                }),
                method: 'PUT'
            })
            const data = res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='user-edit'>
            <div className="container">
                <h2 className="page-heading">Edit your profile</h2>
                <div className="form">
                    <div className="form-names">
                        <div className="form-names__elem">
                            <label>First name</label>
                            <input type="text" placeholder={user.user.first_name} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-names__elem">
                            <label>Last name</label>
                            <input type="text" placeholder={user.user.last_name} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <label>Email</label>
                    <input type="email" placeholder={user.user.email} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Retype new password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
                    <button className='app-btn app-btn--accent' onClick={handleEdit} >Edit profile</button>
                </div>
            </div>
        </div>
    )
}
