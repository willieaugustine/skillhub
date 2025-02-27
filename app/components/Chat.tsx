"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useWebSocket } from "../contexts/WebSocketContext"

type Message = {
  id: number
  sender: string
  content: string
  timestamp: Date
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const { socket, isConnected } = useWebSocket()

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (msg: Message) => {
        setMessages((prevMessages) => [...prevMessages, msg])
      })
    }

    return () => {
      if (socket) {
        socket.off("chat message")
      }
    }
  }, [socket])

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const message: Message = {
        id: Date.now(),
        sender: "You",
        content: newMessage.trim(),
        timestamp: new Date(),
      }
      socket.emit("chat message", message)
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-md">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.sender === "You" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <p className="font-semibold">{message.sender}</p>
              <p>{message.content}</p>
              <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex space-x-2"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" disabled={!isConnected}>
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

