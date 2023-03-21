import { useEffect, useState, useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import Quill from 'quill'

import { AuthContext } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import Comment from '../components/Comment'
import InputGrade from '../components/InputGrade'
import Like from '../components/Like'
import Grade from '../components/Grade'
import Filter from '../components/Filter'

import headers from '../utilities/fetchOptions'

import 'react-quill/dist/quill.snow.css';

export default function ArticleDetail() {
    const { user } = useContext(AuthContext)

    const { id } = useParams()

    const [quill, setQuill] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState()
    const [comments, setComments] = useState()
    const [commentInput, setCommentInput] = useState()

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/articles/${id}`)
                const data = await res.json()

                const [articleRes, commentsRes] = await Promise.all([fetch(`http://localhost:3001/api/articles/${id}`), fetch(`http://localhost:3001/api/comments/article/${id}`)])
                const [articleData, commentsData] = await Promise.all([await articleRes.json(), await commentsRes.json()])

                setComments(commentsData)
                setArticle(articleData)
                quill.updateContents(data?.data)
                setEditorHeight()
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchArticle()
    }, [quill])

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return
        wrapperRef.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow' })
        q.disable()
        setQuill(q)
    }, [])

    const setEditorHeight = () => {
        const editorLength = quill?.getLines().length * 19 + 10
        document.querySelector('.ql-editor').style.height = editorLength + 'px'
    }

    const handleComment = async () => {
        if (commentInput === undefined) return

        try {
            const res = await fetch('http://localhost:3001/api/comments/', {
                headers: headers(user.accessToken),
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    article: id,
                    text: commentInput
                })
            })
            const data = await res.json()
            setComments(prev => [data, ...prev])
            setCommentInput('')
        } catch (error) {
            console.log(error)
        }
    }

    const createdAtDate = new Date(article?.createdAt)
    const updatedAtDate = new Date(article?.updatedAt)

    return (
        <div className="article-detail">
            <div className='container'>
                {isLoading && article == null && comments == null ? <Spinner /> :
                    <>
                        <div className="article__heading">
                            <h2>{article?.title}</h2>
                            <div className="article__dates">
                                <p>Published on {format(new Date(createdAtDate), 'MMMM L, d H:m ')}</p>
                                {updatedAtDate === createdAtDate ? '' : <p>Updated on {format(new Date(updatedAtDate), 'MMMM L, d H:m ')}</p>}
                            </div>
                            <div className="article__details">
                                <InputGrade article={article} />
                                <Grade article={article} />
                                <Like object={article} name={'articles'} />
                            </div>
                        </div>
                        <div className="article__body">
                            <div className="editor" ref={wrapperRef}></div>
                            <div className="comments">
                                <div className="comments__top">
                                    <h3>Comments</h3>
                                    <Filter comments={comments} setComments={setComments} />
                                </div>
                                <div className="form">
                                    <textarea value={commentInput} placeholder='Write a comment...' onChange={(e) => setCommentInput(e.target.value)}></textarea>
                                    <button className='app-btn app-btn--accent' onClick={handleComment}>Comment</button>
                                </div>
                                <div className="comments-list">
                                    {comments.map((comment) => <Comment key={comment._id} setComments={setComments} comment={comment} comments={comments} />)}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
