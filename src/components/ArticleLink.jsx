import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { HiOutlineDocumentText } from 'react-icons/hi'
import { AuthContext } from '../context/AuthContext'
import headers from '../utilities/fetchOptions'

export default function ArticleLink({ article, setArticles }) {
    const { user } = useContext(AuthContext)

    const handleDelete = async (article) => {
        try {
            const remove = await fetch(`https://storynestbackend-production.up.railway.app/api/articles/${article._id}`, {
                headers: headers(user.accessToken),
                credentials: 'include',
                method: 'DELETE',
            })
            setArticles(prev => prev.filter(item => item._id !== article._id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <li className='article-link'><Link to={`/write/${article._id}`}><HiOutlineDocumentText className='doc__icon' />{article.title}</Link><button className='btn-delete' onClick={() => handleDelete(article)} ></button></li>
    )
}
