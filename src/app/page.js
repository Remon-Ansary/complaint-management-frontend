"use client"
import { Form, Input, Button, message } from "antd"
import api from "../utils/api"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

export default function Login() {
  const router = useRouter()
  const { login } = useContext(AuthContext)

  const onFinish = async (values) => {
    try {
      const { data } = await api.post("/login", values)
    
      login(data.token)
      const tokenPayload = JSON.parse(atob(data.token.split(".")[1]))
      if (tokenPayload.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/customer/dashboard")
      }
    } catch (error) {
      message.error(error.response?.data || "Login failed")
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h1>Login</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
      <a href="/register">Register as Customer</a>
    </div>
  )
}
