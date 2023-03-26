import { useState, useContext, useEffect } from 'react'
import { MdGrade } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import headers from '../utilities/fetchOptions'

export default function InputGrade({ article }) {
    const { user } = useContext(AuthContext)
    const [isGraded, setIsGraded] = useState()
    const [grade, setGrade] = useState()

    const arr = [...Array(5).keys()]

    useEffect(() => {
        setGrade(article?.totalGrade)
        if (user == null) return
        checkIfGraded()
    }, [])

    const checkIfGraded = () => {
        if (article.grades != '') {
            article.grades.filter(grade => {
                if (grade === user.user?._id) {
                    return
                }
                setIsGraded(false)
            })
        } else {
            setIsGraded(false)
        }
    }

    const handleInput = async (i) => {
        if (isGraded) {
            return
        } else {
            try {
                const grade = await fetch(`https://storynestbackend-production.up.railway.app/articles/grade/${article._id}`, {
                    headers: headers(user.accessToken),
                    credentials: 'include',
                    method: 'PUT',
                    body: JSON.stringify({
                        grade: i + 1
                    })
                })
                setGrade(i + 1)
                setIsGraded(true)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='input-grade'>{arr.map((i) => <MdGrade key={i} onClick={() => handleInput(i)} className={`grade grade--big  ${i + 1 <= grade ? 'input-grade__item--filled' : 'input-grade__item--black'}`} />)}</div>
    )
}
