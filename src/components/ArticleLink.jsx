import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { HiOutlineDocumentText } from 'react-icons/hi'
import { AuthContext } from '../context/AuthContext'
import headers from '../utilities/fetchOptions'
import { notifyInfo } from '../utilities/messageFunctions.js';

export default function ArticleLink({ article, setArticles }) {
    const { user } = useContext(AuthContext)

    const handleDelete = async (article) => {
        try {
            const remove = await fetch(`https://storynestbackend-production.up.railway.app/api/articles/${article._id}`, {
                headers: headers(user.accessToken),
                credentials: 'include',
                method: 'DELETE',
            })
            notifyInfo('Article deleted.')
            setArticles(prev => prev.filter(item => item._id !== article._id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <li className='article-link'><Link to={`/write/${article._id}`}><HiOutlineDocumentText className='doc__icon' />{article.title}</Link><button className='btn-delete' onClick={() => handleDelete(article)} ></button></li>
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
        </>
    )
}
