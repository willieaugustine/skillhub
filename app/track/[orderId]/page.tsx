"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Package, MapPin, Clock, Phone, MessageSquare } from "lucide-react"
import { OrderMap } from "@/components/order-map"
import { useWebSocket } from "@/contexts/WebSocketContext"

type OrderStatus = "preparing" | "picked_up" | "in_transit" | "delivered"

type DeliveryStep = {
  status: OrderStatus
  title: string
  description: string
  time?: string
  completed: boolean
}

export default function TrackOrderPage() {
  const params = useParams()
  const { toast } = useToast()
  const { socket, isConnected } = useWebSocket()
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("preparing")
  const [estimatedTime, setEstimatedTime] = useState("25-30")
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7128, lng: -74.006 })

  useEffect(() => {
    if (socket) {
      // Listen for updates
      socket.on("orderStatusUpdate", (data: { status: OrderStatus }) => {
        setCurrentStatus(data.status)
        toast({
          title: "Order Status Updated",
          description: `Your order is now ${data.status.replace("_", " ")}`,
        })
      })

      socket.on("driverLocationUpdate", (data: { lat: number; lng: number }) => {
        setDriverLocation(data)
      })

      socket.on("estimatedTimeUpdate", (data: { time: string }) => {
        setEstimatedTime(data.time)
      })

      // Request initial state
      socket.emit("joinOrderRoom", { orderId: params.orderId })
    }

    return () => {
      if (socket) {
        socket.off("orderStatusUpdate")
        socket.off("driverLocationUpdate")
        socket.off("estimatedTimeUpdate")
      }
    }
  }, [socket, params.orderId, toast])

  const deliverySteps: DeliveryStep[] = [
    {
      status: "preparing",
      title: "Order Preparing",
      description: "Your order is being prepared",
      time: "14:30",
      completed: ["preparing", "picked_up", "in_transit", "delivered"].includes(currentStatus),
    },
    {
      status: "picked_up",
      title: "Picked Up",
      description: "Driver has picked up your order",
      time: "14:45",
      completed: ["picked_up", "in_transit", "delivered"].includes(currentStatus),
    },
    {
      status: "in_transit",
      title: "In Transit",
      description: "Your order is on the way",
      time: "14:50",
      completed: ["in_transit", "delivered"].includes(currentStatus),
    },
    {
      status: "delivered",
      title: "Delivered",
      description: "Your order has been delivered",
      completed: ["delivered"].includes(currentStatus),
    },
  ]

  const orderDetails = {
    id: params.orderId,
    items: [
      { name: "Premium Coffee Beans", quantity: 2, price: 15.99 },
      { name: "Organic Green Tea", quantity: 1, price: 12.99 },
    ],
    total: 44.97,
    deliveryAddress: "123 Delivery St, New York, NY 10001",
    driver: {
      name: "John Smith",
      phone: "+1 234 567 8900",
      rating: 4.8,
    },
  }

  const getProgressValue = () => {
    const statusIndex = deliverySteps.findIndex((step) => step.status === currentStatus)
    return ((statusIndex + 1) / deliverySteps.length) * 100
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Track Order</h1>
          <p className="text-muted-foreground">Order ID: {orderDetails.id}</p>
        </div>
        <Badge variant={currentStatus === "delivered" ? "default" : "secondary"} className="text-lg py-1">
          {currentStatus.replace("_", " ").toUpperCase()}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Progress</CardTitle>
              <CardDescription>Track your order's journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={getProgressValue()} className="mb-4" />
              <div className="space-y-6">
                {deliverySteps.map((step, index) => (
                  <div key={step.status} className="flex items-start space-x-4">
                    <div
                      className={`rounded-full p-2 ${
                        step.completed ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{step.title}</h3>
                        {step.time && <span className="text-sm text-muted-foreground">{step.time}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <ul className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${(item.quantity * item.price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${orderDetails.total}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Delivery Address</h3>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>{orderDetails.deliveryAddress}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Tracking</CardTitle>
              <CardDescription>Track your delivery in real-time</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <OrderMap driverLocation={driverLocation} deliveryAddress={orderDetails.deliveryAddress} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Estimated Delivery Time</span>
                </div>
                <span className="font-semibold">{estimatedTime} mins</span>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Driver Details</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    {orderDetails.driver.name} ({orderDetails.driver.rating} ⭐)
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Driver
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

