"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react"

export function StoreAnalytics() {
  const analytics = {
    daily: {
      sales: 450.75,
      orders: 15,
      customers: 12,
      growth: 12.5,
    },
    weekly: {
      sales: 3250.5,
      orders: 85,
      customers: 64,
      growth: 8.2,
    },
    monthly: {
      sales: 12750.25,
      orders: 340,
      customers: 245,
      growth: 15.7,
    },
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        {(Object.keys(analytics) as Array<keyof typeof analytics>).map((period) => (
          <TabsContent key={period} value={period}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analytics[period].sales.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +{analytics[period].growth}% from last {period}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics[period].orders}</div>
                  <p className="text-xs text-muted-foreground">{analytics[period].orders} total orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics[period].customers}</div>
                  <p className="text-xs text-muted-foreground">{analytics[period].customers} new customers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{analytics[period].growth}%</div>
                  <p className="text-xs text-muted-foreground">Compared to last {period}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Your store's sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full bg-muted" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Your best-selling products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Premium Coffee Beans", sales: 145, revenue: 2318.55 },
                { name: "Organic Green Tea", sales: 89, revenue: 1156.11 },
                { name: "Herbal Tea Collection", sales: 65, revenue: 877.35 },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

