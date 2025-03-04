"use client"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { Button } from "antd"
import { useRouter } from "next/navigation"


export default function GlobalLayout({ children }) {
  const { auth, logout } = useContext(AuthContext)
  const router = useRouter()

  const handleDashboardClick = () => {
    if (auth.role === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/customer/dashboard")
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <>
      {auth.isAuthenticated && (
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
            onClick={handleDashboardClick}
          >
            Dashboard
          </div>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </header>
      )}
      <main>{children}</main>
    </>
  )
}
