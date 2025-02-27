import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Trophy, Clock } from "lucide-react"

export default function PromotionsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Promotions & Competitions</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Promotions</CardTitle>
            <CardDescription>Special offers to boost your earnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Double Earnings</h3>
                <p className="text-sm text-muted-foreground">Double earnings on your next 5 tasks!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Happy Hour</h3>
                <p className="text-sm text-muted-foreground">50% bonus on all tasks from 2 PM to 4 PM today!</p>
              </div>
            </div>
            <Button className="w-full">View All Promotions</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Competitions</CardTitle>
            <CardDescription>Compete with others to win prizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Top Earner of the Month</h3>
                <p className="text-sm text-muted-foreground">Win $500! Ends in 7 days.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Most Tasks Completed</h3>
                <p className="text-sm text-muted-foreground">Win a new smartphone! Ends in 3 days.</p>
              </div>
            </div>
            <Button className="w-full">View All Competitions</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

