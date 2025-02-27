"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const initialServices = [
  { id: 1, name: "Package Delivery", price: 10, active: true },
  { id: 2, name: "Furniture Assembly", price: 50, active: true },
  { id: 3, name: "Office Cleaning", price: 75, active: false },
]

export default function ProviderPage() {
  const [services, setServices] = useState(initialServices)
  const [newService, setNewService] = useState({ name: "", price: "" })

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    const price = Number.parseFloat(newService.price)
    if (newService.name && !isNaN(price)) {
      setServices([...services, { id: Date.now(), name: newService.name, price, active: true }])
      setNewService({ name: "", price: "" })
    }
  }

  const toggleServiceStatus = (id: number) => {
    setServices(services.map((service) => (service.id === id ? { ...service, active: !service.active } : service)))
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Provider Dashboard</h1>
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Manage Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Service</CardTitle>
              <CardDescription>Create a new service to offer to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit">Add Service</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your Services</CardTitle>
              <CardDescription>Manage your existing services</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{service.name}</span>
                      <span className="ml-2 text-sm text-muted-foreground">${service.price.toFixed(2)}</span>
                    </div>
                    <div className="space-x-2">
                      <Badge variant={service.active ? "default" : "secondary"}>
                        {service.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => toggleServiceStatus(service.id)}>
                        {service.active ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Service Analytics</CardTitle>
              <CardDescription>View performance metrics for your services</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add analytics content here */}
              <p>Analytics feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

