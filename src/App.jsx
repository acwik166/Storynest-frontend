import { Routes, Route, Navigate } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'

import Home from './pages/Home'
import TextEditor from './pages/TextEditor'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import User from './pages/User'
import UserEdit from './pages/UserEdit'
import Write from './pages/Write'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Logout from './pages/auth/Logout'
import NotFound from './pages/NotFound'

import './sass/main.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} >
        <Route index element={<Home />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/write' element={<Header />}>
          <Route index element={<Write />} />
          <Route path=":id" element={<TextEditor />} />
        </Route>
      </Route>
      <Route path="/articles" element={<Header />} >
        <Route index element={<Articles />} />
        <Route path=":id" element={<ArticleDetail />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/user' element={<Header />}>
          <Route index element={<User />} />
          <Route path="edit" element={<UserEdit />} />
        </Route>
      </Route>
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/404' element={<Header />}>
        <Route index element={<NotFound />} />
      </Route>
      <Route path='*' element={<Navigate to="/404" />} />
    </Routes>
  )
}

export default App
