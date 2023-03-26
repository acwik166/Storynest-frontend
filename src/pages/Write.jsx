import { useState, useEffect, useContext } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import ArticleLink from '../components/ArticleLink'

import { HiOutlineDocumentPlus } from 'react-icons/hi2'

export default function Write() {
    const { user } = useContext(AuthContext)

    const [articles, setArticles] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('https://storynestbackend-production.up.railway.app/api/articles/user/', {
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.accessToken}`
                    },
                })
                const data = await res.json()
                setArticles(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchArticles()
    }, [])

    const handleCreate = () => {
        return navigate(`/write/${uuidV4().substring(0, 28).split('-').join('')}`)
    }

    return (
        <div className="write">
            <div className='container'>
                {isLoading ? <Spinner /> : <div className="write__articles">
                    <div className="write__top">
                        <h2>Your articles</h2>
                        <button className='app-btn app-btn--accent app-btn--icon' onClick={handleCreate}><HiOutlineDocumentPlus className='add__icon' />Create new article</button>
                    </div>
                    <div className="articles-list">
                        <ul>
                            {articles != '' ? articles?.map(article => <ArticleLink key={article._id} article={article} setArticles={setArticles} />) :
                                <p>Looks like You don't have any articles yet..</p>
                            }
                        </ul>
                    </div>
                </div >}
            </div >
        </div>
    )
}
