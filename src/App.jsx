
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'
import { onAuthStateChanged } from 'firebase/auth'


// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

// context
import { AuthProvider } from './context/AuthContext'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'


function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()

  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='about' 
              element={
                user ? <About /> : <Navigate to='/' />
              } />

              <Route path='login'
                element={
                  !user ? <Login /> : <Navigate to='/' />
                } />
              <Route path='register'
                element={
                  !user ? <Register /> : <Navigate to='/' />
                } />

              <Route path='/posts/create'
                element={
                  user ? <CreatePost /> : <Navigate to='/' />
                } />
              <Route path='dashboard'
                element={
                  user ? <Dashboard /> : <Navigate to='/' />
                } />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
