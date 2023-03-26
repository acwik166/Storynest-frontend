import { useState, useEffect } from 'react'

import ArticleItem from '../components/ArticleItem'
import Spinner from '../components/Spinner'

export default function Articles() {
    const [isLoading, setIsLoading] = useState(true)
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await fetch('https://storynestbackend-production.up.railway.app/api/articles/')
                const data = await res.json()

                setArticles(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchApi()
    }, [])

    return (
        <div className="articles">
            <div className="container">
                <h2 className="page-heading">Articles</h2>
                <div className="article__list">
                    {isLoading ? <Spinner /> :
                        articles.map(article => <ArticleItem key={article._id} article={article} />)}
                </div>
            </div>
        </div>
    )
}
