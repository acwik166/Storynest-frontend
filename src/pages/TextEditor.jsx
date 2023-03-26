import { useCallback, useEffect, useState, useContext } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill'
import { AuthContext } from '../context/AuthContext'

export default function TextEditor() {
    const { user } = useContext(AuthContext)

    const [value, setValue] = useState('');
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const [article, setArticle] = useState()

    const [title, setTitle] = useState('Untitled')

    const handleInput = (e) => {
        setTitle(e.target.value)

        setTimeout(() => {
            socket.emit('send-title', e.target.value)
            socket.emit('save-title', e.target.value)
        }, 1000)

    }

    const { id: documentId } = useParams()

    const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: [] }],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ align: [] }],
        ['clean']
    ]

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`https://storynestbackend-production.up.railway.app/api/articles/${documentId}`)
                const data = await res.json()
                if (data.author !== user.user?._id) {
                    return <Navigate to="/" />
                }
                setArticle(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchArticle()
    }, [])

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return
        wrapperRef.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: toolbarOptions } })
        q.disable()
        q.setText('Loading...')
        setQuill(q)
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once('load-document', ({ data, title }) => {
            setTitle(title)
            quill.setContents(data)
            quill.enable()
        })
        const userId = user.user._id

        socket.emit('get-document', { documentId, userId })

    }, [socket, quill, documentId])

    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, 2000)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])

    useEffect(() => {
        const s = io('https://storynestbackend-production.up.railway.app/socket.io')
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])


    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }

        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }

    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta) => {
            quill.updateContents(delta)
        }

        socket.on('receive-title', (title) => {
            setTitle(title)
        })

        socket.on('receive-changes', handler)
    })


    return (
        <div className='editor'>
            <div className='container' ref={wrapperRef}>
                <input type="text" className='article__header' value={title} onInput={(e) => handleInput(e)} placeholder='Untitled' />

            </div >
        </div>
    )
}
