"use client"
import { Form, Input, Button, message } from "antd"
import api from "../../../utils/api"
import { useRouter } from "next/navigation"

export default function NewTicket() {
  const router = useRouter()

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("token")
      await api.post("/tickets", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      message.success("Ticket created!")
      router.push("/customer/dashboard")
    } catch (error) {
      message.error(error.response?.data || "Failed to create ticket")
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "2rem" }}>
      <h1>Create New Ticket</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          name="subject"
          rules={[{ required: true, message: "Please input subject!" }]}
        >
          <Input placeholder="Subject" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Ticket
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
