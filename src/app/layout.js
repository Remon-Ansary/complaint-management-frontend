"use client"
import { AuthProvider } from "./context/AuthContext"
import GlobalLayout from "./GlobalLayout"

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Complaint Management</title>
      </head>
      <body>
        <AuthProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
