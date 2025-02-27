import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chat } from "../components/Chat"

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Chat</h1>
      <Card>
        <CardHeader>
          <CardTitle>Chat with Provider</CardTitle>
          <CardDescription>Discuss task details or ask questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Chat />
        </CardContent>
      </Card>
    </div>
  )
}

