'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { api } from '@/services/api'

interface AuthContextType {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('safe_tx_analyzer_token')
    }
    return null
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('safe_tx_analyzer_token')
  }

  const login = async (username: string, password: string) => {
    try {
      const { data: { token } } = await api.login({
        username,
        password,
      })
      
      setToken(token)
      localStorage.setItem('safe_tx_analyzer_token', token)
    } catch (error) {
      throw error
    }
  }

  // 添加事件监听
  useEffect(() => {
    const handleLogout = () => {
      logout()
    }

    window.addEventListener('auth:logout', handleLogout)
    return () => {
      window.removeEventListener('auth:logout', handleLogout)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 