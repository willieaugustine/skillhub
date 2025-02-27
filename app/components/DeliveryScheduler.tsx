"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

type Delivery = {
  pickupAddress: string
  deliveryAddress: string
  itemDescription: string
  status: "Pending" | "In Progress" | "Completed"
  scheduledDate: string
  scheduledTime: string
  estimatedPayment: string
}

interface DeliverySchedulerProps {
  onDeliveryScheduled: (delivery: Delivery) => void
}

export function DeliveryScheduler({ onDeliveryScheduled }: DeliverySchedulerProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [pickupAddress, setPickupAddress] = useState<string>("")
  const [deliveryAddress, setDeliveryAddress] = useState<string>("")
  const [itemDescription, setItemDescription] = useState<string>("")
  const [estimatedPayment, setEstimatedPayment] = useState<string>("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (date && time && pickupAddress && deliveryAddress && itemDescription && estimatedPayment) {
      const newDelivery: Delivery = {
        pickupAddress,
        deliveryAddress,
        itemDescription,
        status: "Pending",
        scheduledDate: format(date, "yyyy-MM-dd"),
        scheduledTime: time,
        estimatedPayment: `$${estimatedPayment}`,
      }
      onDeliveryScheduled(newDelivery)
      // Reset form
      setDate(undefined)
      setTime("")
      setPickupAddress("")
      setDeliveryAddress("")
      setItemDescription("")
      setEstimatedPayment("")
      alert("Delivery scheduled successfully!")
    } else {
      alert("Please fill in all fields")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Delivery</CardTitle>
        <CardDescription>Enter the details for your delivery</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Pickup Address</Label>
            <Input
              id="pickupAddress"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Enter pickup address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Input
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemDescription">Item Description</Label>
            <Textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="Describe the item(s) to be delivered"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimatedPayment">Estimated Payment ($)</Label>
            <Input
              id="estimatedPayment"
              type="number"
              value={estimatedPayment}
              onChange={(e) => setEstimatedPayment(e.target.value)}
              placeholder="Enter estimated payment"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Schedule Delivery
        </Button>
      </CardFooter>
    </Card>
  )
}

