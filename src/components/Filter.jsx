import { useState } from 'react'

export default function Filter({ comments, setComments }) {
    const [dateFilter, setDateFilter] = useState(false)
    const [likeFilter, setLikeFilter] = useState(false)

    const handleDateFilter = () => {
        setDateFilter(prev => !prev)
        setComments(prev => prev.slice().reverse())
    }

    const handleLikeFilter = () => {
        setLikeFilter(prev => !prev)
        // descending
        const desc = [...comments].sort((a, b) => (b.likeCount == undefined ? 0 : b.likeCount) - (a.likeCount == undefined ? 0 : a.likeCount))
        // ascending
        const asc = [...comments].sort((a, b) => (a.likeCount == undefined ? 0 : a.likeCount) - (b.likeCount == undefined ? 0 : b.likeCount))

        setComments(likeFilter ? asc : desc)
    }

    return (
        <div className="filter">
            <button className='app-btn app-btn--accent' onClick={handleDateFilter} >Date <i className={`btn-arrow ${dateFilter ? 'btn-arrow--up' : 'btn-arrow--down'}`}></i></button>
            <button className='app-btn app-btn--accent' onClick={handleLikeFilter}>Likes <i className={`btn-arrow ${likeFilter ? 'btn-arrow--up' : 'btn-arrow--down'}`}></i></button>
        </div>
    )
}
