"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRating } from "@/components/StarRating"
import { useAuth } from "../contexts/AuthContext"

type DeliveryHistory = {
  id: number
  date: string
  from: string
  to: string
  status: "Completed" | "In Progress" | "Cancelled"
  rating?: number
}

const mockDeliveryHistory: DeliveryHistory[] = [
  { id: 1, date: "2023-06-28", from: "123 Main St", to: "456 Elm St", status: "Completed", rating: 5 },
  { id: 2, date: "2023-06-29", from: "789 Oak Ave", to: "101 Pine Rd", status: "Completed", rating: 4 },
  { id: 3, date: "2023-06-30", from: "222 Maple Dr", to: "333 Cedar Ln", status: "In Progress" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, Anytown, USA",
  })
  const [deliveryHistory, setDeliveryHistory] = useState<DeliveryHistory[]>(mockDeliveryHistory)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin")
    }
  }, [isAuthenticated, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically send the updated profile to your backend
    console.log("Updated profile:", profile)
  }

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Personal Information</TabsTrigger>
          <TabsTrigger value="history">Delivery History</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profile.name} />
                  <AvatarFallback>
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{profile.name}</CardTitle>
                  <CardDescription>{profile.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                {isEditing ? (
                  <div className="flex justify-end space-x-2">
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Delivery History</CardTitle>
              <CardDescription>Your recent deliveries and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {deliveryHistory.map((delivery) => (
                  <li key={delivery.id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{delivery.date}</p>
                        <p>From: {delivery.from}</p>
                        <p>To: {delivery.to}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            delivery.status === "Completed"
                              ? "text-green-500"
                              : delivery.status === "In Progress"
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {delivery.status}
                        </p>
                        {delivery.rating && (
                          <div className="flex items-center justify-end">
                            <span className="mr-2">Rating:</span>
                            <StarRating initialRating={delivery.rating} />
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

