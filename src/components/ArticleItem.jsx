import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Like from './Like'
import Grade from './Grade'

export default function ArticleItem({ article }) {
    const [author, setAuthor] = useState()

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/auth/${article?.author}`)
                const data = await res.json()

                setAuthor(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAuthor()
    }, [])

    const titleRef = useRef()

    return (
        <div className="article">
            <h3 ref={titleRef} className={`${titleRef.current?.clientHeight > 60 ? 'title-more' : ''}`}><Link to={`/articles/${article._id}`}>{article.title}</Link></h3>
            <div className="article__details">
                <Grade article={article} />
                <Like object={article} name="articles" />
            </div>
            <small>by {author?.first_name} {author?.last_name}</small>
        </div>
    )
}
