import { useState, useEffect, useContext } from 'react'

import { AuthContext } from '../context/AuthContext'
import headers from '../utilities/fetchOptions'

import { AiFillHeart } from 'react-icons/ai'

export default function Like({ object, name }) {
    const { user } = useContext(AuthContext)

    const [isLiked, setIsLiked] = useState()
    const [likeCount, setLikeCount] = useState()

    useEffect(() => {
        setLikeCount(object?.likeCount == undefined ? 0 : object?.likeCount)
        if (user == null) return
        checkIfLiked(object, user)
    }, [])

    const like = async () => {
        if (isLiked) {
            try {
                const like = await fetch(`https://storynestbackend-production.up.railway.app/api/${name}/unlike/${object._id}`, {
                    headers: headers(user.accessToken),
                    credentials: 'include',
                    method: 'PUT',
                })
                setLikeCount(prev => prev - 1)
                setIsLiked(false)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const unlike = await fetch(`https://storynestbackend-production.up.railway.app/api/${name}/like/${object._id}`, {
                    headers: headers(user.accessToken),
                    credentials: 'include',
                    method: 'PUT',
                })
                setLikeCount(prev => prev + 1)
                setIsLiked(true)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const checkIfLiked = (object, user) => {
        object?.likes.filter(like => {
            if (like === user.user._id) {
                setIsLiked(true)
                return
            }
            setIsLiked(false)
        })
    }
    return (
        <div className="like-div">
            <AiFillHeart className={`like like-small ${isLiked ? 'like--true' : 'like--false'}`} onClick={like} />
            {likeCount}
        </div>
    )
}
