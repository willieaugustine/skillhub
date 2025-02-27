"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/StarRating"

type Task = {
  id: number
  title: string
  status: "In Progress" | "Pending" | "Completed"
  dueDate: string
  payment: string
  description: string
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Deliver package to 123 Main St",
    status: "In Progress",
    dueDate: "2023-06-30",
    payment: "$15.00",
    description: "Pick up package from the warehouse and deliver it to the specified address.",
  },
  {
    id: 2,
    title: "Assemble furniture at 456 Elm St",
    status: "Pending",
    dueDate: "2023-07-02",
    payment: "$50.00",
    description: "Assemble a new bookshelf and desk set. Tools will be provided on-site.",
  },
  {
    id: 3,
    title: "Clean office at 789 Oak St",
    status: "Completed",
    dueDate: "2023-06-28",
    payment: "$75.00",
    description: "Perform a deep clean of the office space, including vacuuming, dusting, and window cleaning.",
  },
]

export default function TaskDetailPage() {
  const params = useParams()
  const taskId = Number.parseInt(params.id as string)

  const [task, setTask] = useState<Task | null>(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  useEffect(() => {
    // In a real app, you would fetch the task data from an API
    const fetchedTask = mockTasks.find((t) => t.id === taskId)
    if (fetchedTask) {
      setTask(fetchedTask)
    }
  }, [taskId])

  const handleStatusChange = (newStatus: string) => {
    if (task) {
      setTask({ ...task, status: newStatus as Task["status"] })
    }
  }

  const handleSubmitReview = () => {
    // Here you would typically send the review to your backend
    console.log(`Submitting review for task ${taskId}:`, { rating, review })
    alert("Review submitted successfully!")
  }

  if (!task) {
    return <div>Task not found</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Task Details</h1>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{task.title}</CardTitle>
            <Badge>{task.status}</Badge>
          </div>
          <CardDescription>Due: {task.dueDate}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{task.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Payment</h3>
            <p>{task.payment}</p>
          </div>
          <div>
            <h3 className="font-semibold">Update Status</h3>
            <Select value={task.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
          <CardDescription>Share your experience with this task</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Rating</h3>
            <StarRating onRatingChange={setRating} />
          </div>
          <div>
            <h3 className="font-semibold">Review</h3>
            <Textarea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitReview}>Submit Review</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

