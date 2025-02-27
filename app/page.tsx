import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Delivery App</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Connect with Taskers, Providers, and Customers for efficient deliveries and tasks.
      </p>
      <div className="space-y-4 w-full max-w-xs">
        <Link href="/signup" className="block">
          <Button className="w-full text-lg py-6">Sign Up</Button>
        </Link>
        <Link href="/login" className="block">
          <Button variant="outline" className="w-full text-lg py-6">
            Log In
          </Button>
        </Link>
      </div>
    </div>
  )
}

