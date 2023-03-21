import { useState, useEffect } from 'react'

import { MdGrade } from 'react-icons/md';

export default function Grade({ article }) {
    const [gradeTotal, setGradeTotal] = useState()

    useEffect(() => {
        setGradeTotal(article?.totalGrade != 'NaN' ? article?.totalGrade : 0)
    }, [])

    return (
        <div className="grade-div">
            <MdGrade className='grade grade-big' />
            {gradeTotal}
        </div>
    )
}
