"use client"
import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
    isAuthenticated: false,
  })

  // On mount, load token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        setAuth({
          token,
          role: payload.role,
          isAuthenticated: true,
        })
      } catch (error) {
        console.error("Token decoding failed:", error)
      }
    }
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      setAuth({
        token,
        role: payload.role,
        isAuthenticated: true,
      })
    } catch (error) {
      console.error("Token decoding failed:", error)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setAuth({
      token: null,
      role: null,
      isAuthenticated: false,
    })
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
