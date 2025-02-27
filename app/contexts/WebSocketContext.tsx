"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { EventEmitter } from "events"

// Create a mock socket for development when WebSocket URL is not available
class MockSocket extends EventEmitter {
  connected = false

  constructor() {
    super()
    this.connect()
  }

  connect() {
    setTimeout(() => {
      this.connected = true
      this.emit("connect")

      // Simulate order updates every 30 seconds
      setInterval(() => {
        const statuses = ["preparing", "picked_up", "in_transit", "delivered"]
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        this.emit("orderStatusUpdate", { status: randomStatus })

        // Simulate driver location updates
        this.emit("driverLocationUpdate", {
          lat: 40.7128 + (Math.random() - 0.5) * 0.01,
          lng: -74.006 + (Math.random() - 0.5) * 0.01,
        })

        // Simulate estimated time updates
        this.emit("estimatedTimeUpdate", {
          time: `${15 + Math.floor(Math.random() * 15)}-${25 + Math.floor(Math.random() * 15)}`,
        })
      }, 30000)
    }, 1000)
  }

  close() {
    this.connected = false
    this.emit("disconnect")
  }

  emit(event: string, ...args: any[]) {
    return super.emit(event, ...args)
  }

  on(event: string, listener: (...args: any[]) => void) {
    return super.on(event, listener)
  }

  off(event: string, listener?: (...args: any[]) => void) {
    if (typeof listener === "function") {
      return super.removeListener(event, listener)
    }
  }
}

interface WebSocketContextType {
  socket: any
  isConnected: boolean
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
})

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    let socketInstance: any

    if (process.env.NEXT_PUBLIC_WEBSOCKET_URL) {
      // Use real socket.io when URL is available
      const io = require("socket.io-client")
      socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL)
    } else {
      // Use mock socket for development
      socketInstance = new MockSocket()
    }

    socketInstance.on("connect", () => {
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.close()
    }
  }, [])

  return <WebSocketContext.Provider value={{ socket, isConnected }}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}
