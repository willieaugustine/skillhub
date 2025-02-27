import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackingNumber = searchParams.get("trackingNumber")

  // This is a mock response. In a real application, you would fetch this data from a real API or database
  const mockStatus = {
    status: "In Transit",
    location: "Distribution Center, New York",
    lastUpdated: new Date().toISOString(),
  }

  return NextResponse.json(mockStatus)
}

