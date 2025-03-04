"use client"
import { Form, Input, Button, message } from "antd"
import api from "../../utils/api"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()

  const onFinish = async (values) => {
    try {
      await api.post("/register", values)
      message.success("Registration successful! Please login.")
      router.push("/")
    } catch (error) {
      message.error(error.response?.data || "Registration failed")
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h1>Register</h1>
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
