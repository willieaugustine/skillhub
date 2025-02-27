"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation2, MapPin } from "lucide-react"
import dynamic from "next/dynamic"

interface OrderMapProps {
  driverLocation: {
    lat: number
    lng: number
  }
  deliveryAddress: string
}

// Dynamically import ReactMapGL to avoid SSR issues
const ReactMapGL = dynamic(() => import("react-map-gl").then((mod) => mod.default), { ssr: false })

const Marker = dynamic(() => import("react-map-gl").then((mod) => mod.Marker), { ssr: false })

export function OrderMap({ driverLocation, deliveryAddress }: OrderMapProps) {
  const [viewState, setViewState] = useState({
    latitude: (driverLocation.lat + 40.7282) / 2,
    longitude: (driverLocation.lng + -73.9942) / 2,
    zoom: 12,
  })

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!mapboxToken) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <CardContent className="text-center p-4">
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-primary">
                <Navigation2 className="h-6 w-6" />
                <span>Driver Location</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <MapPin className="h-6 w-6" />
                <span>Delivery Location</span>
              </div>
            </div>
            <p className="text-muted-foreground">
              Map view is currently unavailable.
              <br />
              Driver is en route to: {deliveryAddress}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ReactMapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
      >
        <Marker latitude={driverLocation.lat} longitude={driverLocation.lng}>
          <div className="bg-primary text-primary-foreground p-2 rounded-full">
            <Navigation2 className="h-4 w-4" />
          </div>
        </Marker>

        <Marker latitude={40.7282} longitude={-73.9942}>
          <div className="bg-secondary text-secondary-foreground p-2 rounded-full">
            <MapPin className="h-4 w-4" />
          </div>
        </Marker>
      </ReactMapGL>
    </div>
  )
}

