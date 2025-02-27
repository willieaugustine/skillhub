"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Package, DollarSign, Star } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"

// This would typically come from an API or database
const analyticsData = {
  totalDeliveries: 24,
  completedDeliveries: 20,
  pendingDeliveries: 4,
  totalEarnings: 1234.56,
  averageRating: 4.7,
  weeklyDeliveries: [3, 5, 4, 6, 2, 3, 1],
  topCategories: [
    { name: "Food", percentage: 40 },
    { name: "Groceries", percentage: 30 },
    { name: "Documents", percentage: 20 },
    { name: "Other", percentage: 10 },
  ],
}

export default function DashboardPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin")
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalDeliveries}</div>
                <p className="text-xs text-muted-foreground">
                  {analyticsData.completedDeliveries} completed, {analyticsData.pendingDeliveries} pending
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analyticsData.totalEarnings.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.averageRating}</div>
                <p className="text-xs text-muted-foreground">Out of 5 stars</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {((analyticsData.completedDeliveries / analyticsData.totalDeliveries) * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Deliveries</CardTitle>
              <CardDescription>Your delivery count over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Here you would typically use a charting library like recharts */}
              <div className="h-[200px] w-full bg-muted" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
              <CardDescription>Your most frequent delivery categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analyticsData.topCategories.map((category) => (
                  <li key={category.name} className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span>{category.percentage}%</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deliveries" className="space-y-4">
          {/* Add content for deliveries tab */}
        </TabsContent>
        <TabsContent value="earnings" className="space-y-4">
          {/* Add content for earnings tab */}
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/tasks">
            <Button>
              <Package className="mr-2 h-4 w-4" /> View Available Deliveries
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="secondary">
              <Star className="mr-2 h-4 w-4" /> View Your Ratings
            </Button>
          </Link>
          <Link href="/earnings">
            <Button variant="outline">
              <DollarSign className="mr-2 h-4 w-4" /> View Earnings Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

