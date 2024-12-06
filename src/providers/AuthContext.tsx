'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { api } from '@/services/api'
import JSEncrypt from 'jsencrypt'

interface AuthContextType {
  token: string | null
  login: (username: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token')
      const expiresAt = localStorage.getItem('token_expires_at')
      
      if (storedToken && expiresAt) {
        // 检查是否过期
        if (Date.now() < parseInt(expiresAt) * 1000) {
          return storedToken
        } else {
          // 已过期，清除存储
          localStorage.removeItem('token')
          localStorage.removeItem('token_expires_at')
        }
      }
    }
    return null
  })

  const login = async (username: string, password: string) => {
    try {
      // 1. 获取公钥
      const { data: { public_key } } = await api.getPublicKey()
      
      // 2. 加密密码
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(public_key)
      const encryptedPassword = encrypt.encrypt(password)

      // 3. 登录
      const { data: { token, expires_at } } = await api.login({
        username,
        password: encryptedPassword as string,
      })
      
      // 4. 保存 token 和过期时间
      setToken(token)
      localStorage.setItem('token', token)
      localStorage.setItem('token_expires_at', expires_at.toString())
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ token, login }}>
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