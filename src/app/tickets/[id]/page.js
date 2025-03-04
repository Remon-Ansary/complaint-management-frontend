"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Card,
  Button,
  message,
  Input,
  Select,
  List,
  Typography,
  Divider,
  Space,
} from "antd"
import api from "../../../utils/api"

const { TextArea } = Input
const { Option } = Select
const { Title, Paragraph } = Typography

export default function TicketDetails() {
  const router = useRouter()
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [reply, setReply] = useState("")
  const [status, setStatus] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [replies, setReplies] = useState([])

  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        setIsAdmin(payload.role === "admin")
      } catch (e) {
        console.error("Failed to decode token", e)
      }
    }
  }, [])


  useEffect(() => {
    if (!id) return
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token")
        const { data } = await api.get(`/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTicket(data)
        setStatus(data.status)
      } catch (error) {
        message.error(error.response?.data || "Failed to fetch ticket")
      }
    }

    fetchTicket()
  }, [id])


  useEffect(() => {
    if (!id) return
    const fetchReplies = async () => {
      try {
        const token = localStorage.getItem("token")
        const { data } = await api.get(`/tickets/${id}/replies`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setReplies(data)
      } catch (error) {
        message.error(error.response?.data || "Failed to fetch replies")
      }
    }

    fetchReplies()
  }, [id])

 
  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      await api.put(
        `/tickets/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      message.success("Ticket status updated!")
      setTicket({ ...ticket, status })
    } catch (error) {
      message.error(error.response?.data || "Failed to update ticket status")
    }
  }


  const handleReply = async () => {
    try {
      const token = localStorage.getItem("token")
      await api.post(
        `/tickets/${id}/replies`,
        { reply },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      message.success("Reply submitted!")
      setReply("")
      
      const { data } = await api.get(`/tickets/${id}/replies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setReplies(data)
    } catch (error) {
      message.error(error.response?.data || "Failed to submit reply")
    }
  }

  if (!ticket) return <p>Loading...</p>

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "2rem" }}>
      {/* Ticket Details Card */}
      <Card
        style={{
          marginBottom: "2rem",
          backgroundColor: "#fff1f0", 
          borderRadius: "8px",
        }}
      >
        <Title level={3}>Ticket Details</Title>
        <Paragraph>
          <strong>Subject:</strong> {ticket.subject}
        </Paragraph>
        <Paragraph>
          <strong>Description:</strong> {ticket.description}
        </Paragraph>
        <Paragraph>
          <strong>Status:</strong> {ticket.status}
        </Paragraph>
        <Paragraph>
          <strong>Created At:</strong>{" "}
          {new Date(ticket.createdAt).toLocaleString()}
        </Paragraph>
      </Card>

      {/* Admin Actions Card */}
      {isAdmin && (
        <Card
          style={{
            marginBottom: "2rem",
            backgroundColor: "#e6f7ff", 
            borderRadius: "8px",
          }}
        >
          <Title level={4}>Admin Actions</Title>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <div>
              <Title level={5}>Update Ticket Status</Title>
              <Space>
                <Select
                  value={status}
                  onChange={(value) => setStatus(value)}
                  style={{ width: 200 }}
                >
                  <Option value="Open">Open</Option>
                  <Option value="Resolved">Resolved</Option>
                  <Option value="Closed">Closed</Option>
                </Select>
                <Button type="primary" onClick={handleUpdateStatus}>
                  Update Status
                </Button>
              </Space>
            </div>
            <Divider />
            <div>
              <Title level={5}>Add Reply</Title>
              <TextArea
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Enter your reply here"
              />
              <Button
                type="primary"
                style={{ marginTop: "1rem" }}
                onClick={handleReply}
              >
                Submit Reply
              </Button>
            </div>
          </Space>
        </Card>
      )}

      {/* Replies Card */}
      <Card
        style={{
          backgroundColor: "#f6ffed", 
          borderRadius: "8px",
        }}
      >
        <Title level={4}>Replies</Title>
        <List
          itemLayout="horizontal"
          dataSource={replies}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`${item.username} - ${new Date(
                  item.createdAt
                ).toLocaleString()}`}
                description={item.reply}
              />
            </List.Item>
          )}
        />
      </Card>

      <div style={{ marginTop: "2rem" }}>
        <Button onClick={() => router.back()}>Back</Button>
      </div>
    </div>
  )
}
