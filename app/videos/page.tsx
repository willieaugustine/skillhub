import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function VideosPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Earn by Watching Videos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Watch videos to earn money</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Daily Goal</span>
            <span>$5.00 / $10.00</span>
          </div>
          <Progress value={50} />
          <p className="text-sm text-muted-foreground">Watch 5 more videos to reach your daily goal!</p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Product Review</CardTitle>
            <CardDescription>2:30 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Watch for $0.50</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cooking Tutorial</CardTitle>
            <CardDescription>5:00 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Watch for $1.00</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Travel Vlog</CardTitle>
            <CardDescription>3:45 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Watch for $0.75</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

