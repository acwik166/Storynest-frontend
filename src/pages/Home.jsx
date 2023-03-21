import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import ArticleItem from '../components/ArticleItem'

export default function Home() {
    const [articles, setArticles] = useState()

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/articles/top')
                const data = await res.json()
                setArticles(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchArticles()
    }, [])

    return (
        <div className="home">
            <div className="container">
                <h2 className='page-heading'>Top articles</h2>
                <div className="home__top-articles">
                    {articles?.map(article => <ArticleItem key={article._id} article={article} />)}
                </div>
            </div>
        </div>
    )
}
