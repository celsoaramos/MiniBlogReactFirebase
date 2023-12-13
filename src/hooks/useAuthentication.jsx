import { db } from '../firebase/config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)


  const auth = getAuth()

  function checkIfIsCancelled() {
    if (cancelled) {
      return
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled()

    setLoading(true)
    setError('')

    try {
      const {user} = await createUserWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      )

      await updateProfile(user, {
        displayName: data.name
      })

      setLoading(false)
      return user

    } catch(error) {
      console.log('[createUser]', error.message)
      console.log('[createUser]', typeof error.message)
      
      let systemErroMessage
      if (error.message.includes('email-already-in-use')) {
        systemErroMessage = 'O email já está em uso'
      
      } else if (error.message.includes('auth/invalid-email')) {
        systemErroMessage = 'O email é inválido'
      
      } else if (error.message.includes('weak-password')) {
        systemErroMessage = 'A senha precisa ter pelo menos 6 caracteres'
      } else {
        systemErroMessage = 'Erro ao criar usuário'
      }

      setLoading(false)
      setError(systemErroMessage)
    }
  }

  const login = async(data) => {
    checkIfIsCancelled()

    setLoading(true)
    setError(false)

    try {
      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      setLoading(false)

    } catch(error) {
      console.log('[login]', error.message)
      console.log('[login]', typeof error.message)

      let systemErroMessage
      if (error.message.includes('user-not-found')) {
        systemErroMessage = 'Usuário não encontrado'
      
      } else if (error.message.includes('invalid-credential')) {
        systemErroMessage = 'Usuário ou senha incorreta'
      
      } else if (error.message.includes('invalid-email')) {
        systemErroMessage = 'O email é inválido'
      
      } else {
        systemErroMessage = 'Erro ao fazer login'
      }

      setLoading(false)
      setError(systemErroMessage)
    }
  }

  //logout
  const logout = async () => {
    checkIfIsCancelled()

    try {
      await signOut(auth)

    } catch(error) {
      console.log('[logout]', error.message)
    }
  }

  useEffect(() => {
    return () => {
      setCancelled(true)
    }
  }, [])


  return {
    auth,
    createUser,
    error,
    loading,
    login,
    logout
  }



}
