"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TaskMap } from "../components/TaskMap"
import { DeliveryScheduler } from "../components/DeliveryScheduler"
import { useAuth } from "../contexts/AuthContext"
import Link from "next/link"

type Task = {
  id: number
  title: string
  status: "Pending" | "In Progress" | "Completed"
  pickupAddress: string
  deliveryAddress: string
  dueDate: string
  payment: string
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Deliver groceries",
    status: "Pending",
    pickupAddress: "123 Market St",
    deliveryAddress: "456 Oak Ave",
    dueDate: "2023-06-30",
    payment: "$15.00",
  },
  {
    id: 2,
    title: "Deliver restaurant order",
    status: "In Progress",
    pickupAddress: "789 Bistro Ln",
    deliveryAddress: "101 Pine Rd",
    dueDate: "2023-06-30",
    payment: "$12.50",
  },
  {
    id: 3,
    title: "Deliver package",
    status: "Completed",
    pickupAddress: "222 Warehouse Blvd",
    deliveryAddress: "333 Residential St",
    dueDate: "2023-06-29",
    payment: "$20.00",
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("dueDate")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin")
    }
  }, [isAuthenticated, router])

  const addTask = (newDelivery: Omit<Task, "id">) => {
    setTasks([...tasks, { ...newDelivery, id: tasks.length + 1 }])
  }

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(
        (task) =>
          (filterStatus === "all" || task.status === filterStatus) &&
          task.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortBy === "dueDate") {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        } else if (sortBy === "payment") {
          return Number.parseFloat(a.payment.slice(1)) - Number.parseFloat(b.payment.slice(1))
        }
        return 0
      })
  }, [tasks, filterStatus, sortBy, searchQuery])

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Available Deliveries</h1>
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Delivery</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="flex space-x-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px]"
            />
          </div>
          {filteredAndSortedTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{task.title}</CardTitle>
                  <Badge>{task.status}</Badge>
                </div>
                <CardDescription>Due: {task.dueDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Pickup:</strong> {task.pickupAddress}
                  </p>
                  <p>
                    <strong>Delivery:</strong> {task.deliveryAddress}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{task.payment}</span>
                    <Link href={`/tasks/${task.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="map">
          <TaskMap />
        </TabsContent>
        <TabsContent value="schedule">
          <DeliveryScheduler onDeliveryScheduled={addTask} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

