import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from a database or API
const newsItems = [
  {
    id: 1,
    title: "New Feature: Earn by Watching Videos",
    description: "We've just launched a new way for you to earn money - by watching videos!",
    date: "2023-06-01",
    category: "Feature Update",
  },
  {
    id: 2,
    title: "Summer Promotion: Double Earnings",
    description: "For the entire month of July, earn double on all your completed tasks!",
    date: "2023-06-15",
    category: "Promotion",
  },
  {
    id: 3,
    title: "Community Spotlight: Meet Our Top Earner",
    description: "Read about John Doe's journey to becoming our platform's top earner last month.",
    date: "2023-06-10",
    category: "Community",
  },
]

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">News & Announcements</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{item.title}</CardTitle>
                <Badge>{item.category}</Badge>
              </div>
              <CardDescription>{new Date(item.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{item.description}</p>
              <Link href={`/news/${item.id}`}>
                <Button variant="outline">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
          <CardDescription>Stay up to date with the latest trends in our community</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>The rise of micro-tasks in the gig economy</li>
            <li>How to maximize your earnings on our platform</li>
            <li>Balancing full-time work and side gigs</li>
            <li>Top 10 highest-paying tasks this month</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

