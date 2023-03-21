import React from 'react'

import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='not-found'>
            <h2>Not found</h2>
            <p>Sorry, we couldn't find that page</p>
            <button className='app-btn app-btn--accent'><Link to="/">Go back to the home page</Link></button>
        </div>
    )
}
