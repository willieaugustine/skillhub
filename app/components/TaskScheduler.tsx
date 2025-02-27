"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

type Task = {
  title: string
  status: "In Progress" | "Pending" | "Completed"
  dueDate: string
  payment: string
}

interface TaskSchedulerProps {
  onTaskScheduled: (task: Task) => void
}

export function TaskScheduler({ onTaskScheduled }: TaskSchedulerProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [taskType, setTaskType] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [payment, setPayment] = useState<string>("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (date && time && taskType && description && payment) {
      const newTask: Task = {
        title: `${taskType} - ${description}`,
        status: "Pending",
        dueDate: `${format(date, "yyyy-MM-dd")} ${time}`,
        payment: `$${payment}`,
      }
      onTaskScheduled(newTask)
      // Reset form
      setDate(undefined)
      setTime("")
      setTaskType("")
      setDescription("")
      setPayment("")
      alert("Task scheduled successfully!")
    } else {
      alert("Please fill in all fields")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Task</CardTitle>
        <CardDescription>Book a task for a future date and time</CardDescription>
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
            <Label htmlFor="taskType">Task Type</Label>
            <Select value={taskType} onValueChange={setTaskType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your task"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment">Payment Amount</Label>
            <Input
              id="payment"
              type="number"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              placeholder="Enter payment amount"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Schedule Task
        </Button>
      </CardFooter>
    </Card>
  )
}

