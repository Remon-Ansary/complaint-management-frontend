"use client"
import { useState, useEffect } from "react"
import { Table, Button, message, Tag, Popconfirm } from "antd"
import api from "../../../utils/api"
import { useRouter } from "next/navigation"

export default function CustomerDashboard() {
  const [tickets, setTickets] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token")
        const { data } = await api.get("/tickets/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTickets(data)
      } catch (error) {
        message.error(error.response?.data || "Failed to fetch tickets")
      }
    }
    fetchTickets()
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await api.delete(`/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      message.success("Ticket deleted successfully")
      
      setTickets(tickets.filter((ticket) => ticket.id !== id))
    } catch (error) {
      message.error(error.response?.data || "Failed to delete ticket")
    }
  }

  const columns = [
    { title: "Ticket ID", dataIndex: "id", key: "id" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color
        if (status === "Open") {
          color = "green"
        } else if (status === "Resolved") {
          color = "blue"
        } else if (status === "Closed") {
          color = "red"
        } else {
          color = "default"
        }
        return <Tag color={color}>{status}</Tag>
      },
    },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => router.push(`/tickets/${record.id}`)}
          >
            View
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this ticket?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger style={{ marginLeft: "0.5rem" }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Customer Dashboard</h1>
      <Button
        type="primary"
        onClick={() => router.push("/tickets/new")}
        style={{ marginBottom: "1rem" }}
      >
        Create New Ticket
      </Button>
      <Table dataSource={tickets} columns={columns} rowKey="id" />
    </div>
  )
}
