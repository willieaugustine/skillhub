"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Store } from "lucide-react"
import { StoreProducts } from "../components/store-products"
import { StoreOrders } from "../components/store-orders"
import { StoreAnalytics } from "../components/store-analytics"

export default function StorePage() {
  const { toast } = useToast()
  const [storeInfo, setStoreInfo] = useState({
    name: "My Store",
    description: "Welcome to my store! We offer quality products at great prices.",
    address: "123 Store Street, City, Country",
    phone: "+1 234 567 8900",
    email: "store@example.com",
    isOpen: true,
    openingHours: "9:00 AM - 6:00 PM",
    deliveryRadius: "10",
  })

  const handleStoreUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Store updated",
      description: "Your store information has been updated successfully.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Store Management</h1>
        <Button>
          <Store className="mr-2 h-4 w-4" /> View Store
        </Button>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <StoreProducts />
        </TabsContent>

        <TabsContent value="orders">
          <StoreOrders />
        </TabsContent>

        <TabsContent value="analytics">
          <StoreAnalytics />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
              <CardDescription>Manage your store information and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStoreUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    value={storeInfo.name}
                    onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-description">Description</Label>
                  <Textarea
                    id="store-description"
                    value={storeInfo.description}
                    onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email</Label>
                    <Input
                      id="store-email"
                      type="email"
                      value={storeInfo.email}
                      onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Phone</Label>
                    <Input
                      id="store-phone"
                      value={storeInfo.phone}
                      onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-address">Address</Label>
                  <Input
                    id="store-address"
                    value={storeInfo.address}
                    onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="opening-hours">Opening Hours</Label>
                    <Input
                      id="opening-hours"
                      value={storeInfo.openingHours}
                      onChange={(e) => setStoreInfo({ ...storeInfo, openingHours: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-radius">Delivery Radius (km)</Label>
                    <Input
                      id="delivery-radius"
                      type="number"
                      value={storeInfo.deliveryRadius}
                      onChange={(e) => setStoreInfo({ ...storeInfo, deliveryRadius: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={storeInfo.isOpen}
                    onCheckedChange={(checked) => setStoreInfo({ ...storeInfo, isOpen: checked })}
                  />
                  <Label>Store is currently {storeInfo.isOpen ? "open" : "closed"}</Label>
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

