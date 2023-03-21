import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

import Comment from '../components/Comment'
import Spinner from '../components/Spinner'
import ArticleLink from '../components/ArticleLink'
import headers from '../utilities/fetchOptions'

export default function User() {
    const { user } = useContext(AuthContext)
    const [articles, setArticles] = useState()
    const [comments, setComments] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchApi = async () => {
            try {
                console.log(headers(user.accessToken))
                const [articlesRes, commentsRes] = await Promise.all([fetch('http://localhost:3001/api/articles/user/', { headers: headers(user.accessToken) }), fetch('http://localhost:3001/api/comments/user/', { headers: headers(user.accessToken) })])
                const [articlesData, commentsData] = await Promise.all([articlesRes.json(), commentsRes.json()])

                setArticles(articlesData)
                setComments(commentsData)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi()
    }, [])

    return (
        <div className='user'>
            <div className="container">
                {isLoading ? <Spinner /> : <>
                    <h2>Hello {user.user?.first_name}!</h2>
                    <div className="user__details">
                        <div className="user__details__left">
                            {/* <p>Your points: <span>1650</span></p> */}
                            <p>Total articles: <span>{articles.length}</span></p>
                            <p>Total comments: <span>{comments.length}</span></p>
                        </div>
                        <button className='app-btn app-btn--accent app-btn--icon'><Link to="edit">Edit profile</Link></button>
                    </div>
                    <div className="user__activities">
                        <div className="activities__articles">
                            <div className="articles-list">
                                <ul>
                                    {articles == '' ? <p>Looks like You don't have any articles yet..</p> : articles?.map(article => <ArticleLink key={article._id} article={article} setArticles={setArticles} />)}
                                </ul>
                            </div>
                        </div>
                        <div className="activities__comments">
                            {comments == '' ? <p className='comments-empty'>Looks like You don't have any comments yet..</p> : comments?.map(comment => <Comment key={comment._id} comment={comment} comments={comments} setComments={setComments} />)}
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}
