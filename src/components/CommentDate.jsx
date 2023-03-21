import React from 'react'
import { formatDistance, subDays } from 'date-fns'

export default function CommentDate({ date }) {
    return (
        <small className='comment-data'>{formatDistance(new Date(date), new Date())} ago</small>
    )
}
