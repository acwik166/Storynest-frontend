import { useState, useEffect, useContext } from 'react'

import Like from './Like'
import CommentDate from './CommentDate'
import { AuthContext } from '../context/AuthContext'

import headers from '../utilities/fetchOptions'

export default function Comment({ comment, setComments, comments }) {
    const { user } = useContext(AuthContext)

    const [author, setAuthor] = useState()
    const [commentEdit, setCommentEdit] = useState('')
    const [showCommentEdit, setShowCommentEdit] = useState(false)

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(`https://storynestbackend-production.up.railway.app/api/auth/${comment.author}`)
            const data = await res.json()

            setAuthor(data)
        }
        fetchApi()
    }, [])

    const handleDelete = async () => {
        if (comment.author !== author?._id) return

        try {
            const remove = await fetch(`https://storynestbackend-production.up.railway.app/api/comments/${comment._id}`, {
                headers: headers(user.accessToken),
                credentials: 'include',
                method: 'DELETE',
            })
            setComments(prev => prev.filter(item => item._id !== comment._id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async () => {
        if (comment.author !== author?._id) return

        if (commentEdit == '') return

        try {
            const update = await fetch(`https://storynestbackend-production.up.railway.app/api/comments/${comment?._id}`, {
                headers: headers(user.accessToken),
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({
                    text: commentEdit
                })
            })
            setShowCommentEdit(false)
            const commentsList = [...comments]
            const item = commentsList.find(i => i._id === comment?._id)
            item.text = commentEdit
            setComments(commentsList)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='comment'>
            <div className="comment-wrapper">
                <div className="details">
                    <h3>{author?.first_name} {author?.last_name}</h3>
                    <CommentDate date={comment?.createdAt} />
                    {showCommentEdit ? <input type="text" className='comment-edit' placeholder={comment?.text} value={commentEdit} onChange={(e) => setCommentEdit(e.target.value)} /> :
                        <p>{comment?.text}</p>
                    }
                    <Like object={comment} name={'comments'} />
                </div>
                <div className="btns">
                    {comment.author === author?._id ? <><button className='btn-edit' onClick={() => setShowCommentEdit(prev => !prev)}></button><button className="btn-delete" onClick={handleDelete}></button></> : ''}
                </div>
            </div>
            {showCommentEdit ? <button className='app-btn app-btn--accent' onClick={handleEdit}>Update</button> : ''}
        </div>
    )
}
