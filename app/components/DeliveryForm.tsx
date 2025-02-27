"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const recentDeliveries = [
  { id: 1, trackingNumber: "TN123456789", status: "Delivered", date: "2023-06-28" },
  { id: 2, trackingNumber: "TN987654321", status: "In Transit", date: "2023-06-29" },
  { id: 3, trackingNumber: "TN456789123", status: "Processing", date: "2023-06-30" },
]

export default function DeliveryForm({
  getDeliveryStatus,
}: { getDeliveryStatus: (prevState: any, formData: FormData) => Promise<any> }) {
  const [state, formAction] = useFormState(getDeliveryStatus, null)
  const [trackingNumber, setTrackingNumber] = useState("")

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Track a Delivery</CardTitle>
          <CardDescription>Enter a tracking number to get the latest status</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Input
              type="text"
              name="trackingNumber"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
            />
            <Button type="submit">Track Delivery</Button>
          </form>
          {state && (
            <div className="mt-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">Delivery Status:</h2>
              <p>Status: {state.status}</p>
              <p>Location: {state.location}</p>
              <p>Last Updated: {state.lastUpdated}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>Your last tracked deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentDeliveries.map((delivery) => (
              <li key={delivery.id} className="flex justify-between items-center">
                <span>{delivery.trackingNumber}</span>
                <span>{delivery.status}</span>
                <span>{delivery.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

