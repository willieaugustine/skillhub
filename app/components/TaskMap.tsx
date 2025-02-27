"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// You would typically store this in an environment variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN_HERE"

type Task = {
  id: number
  title: string
  status: "Pending" | "In Progress" | "Completed"
  pickupAddress: string
  deliveryAddress: string
  payment: number
  pickupLatitude: number
  pickupLongitude: number
  deliveryLatitude: number
  deliveryLongitude: number
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Deliver groceries",
    status: "Pending",
    pickupAddress: "123 Market St",
    deliveryAddress: "456 Oak Ave",
    payment: 15,
    pickupLatitude: 40.7128,
    pickupLongitude: -74.006,
    deliveryLatitude: 40.7282,
    deliveryLongitude: -73.9942,
  },
  {
    id: 2,
    title: "Deliver restaurant order",
    status: "In Progress",
    pickupAddress: "789 Bistro Ln",
    deliveryAddress: "101 Pine Rd",
    payment: 12.5,
    pickupLatitude: 40.7589,
    pickupLongitude: -73.9851,
    deliveryLatitude: 40.7489,
    deliveryLongitude: -73.9751,
  },
]

const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

export function TaskMap() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle>Available Deliveries Near You</CardTitle>
        <CardDescription>Click on a marker to see delivery details</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <MapWithNoSSR
          tasks={tasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          mapboxToken={MAPBOX_TOKEN}
        />
      </CardContent>
    </Card>
  )
}

