"use client"

import { useState } from "react"
import ReactMapGL, { Marker, Popup, type ViewState } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Button } from "@/components/ui/button"

type Task = {
  id: number
  title: string
  status: "Pending" | "In Progress" | "Completed"
  pickupAddress: string
  deliveryAddress: string
  payment: number
  pickupLatitude: number
  pickupLongitude: number
  deliveryLatitude: number
  deliveryLongitude: number
}

type MapComponentProps = {
  tasks: Task[]
  selectedTask: Task | null
  setSelectedTask: (task: Task | null) => void
  mapboxToken: string
}

export default function MapComponent({ tasks, selectedTask, setSelectedTask, mapboxToken }: MapComponentProps) {
  const [viewState, setViewState] = useState<ViewState>({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 11,
  })

  return (
    <ReactMapGL
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={mapboxToken}
    >
      {tasks.map((task) => (
        <div key={task.id}>
          <Marker
            latitude={task.pickupLatitude}
            longitude={task.pickupLongitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelectedTask(task)
            }}
          >
            📦
          </Marker>
          <Marker
            latitude={task.deliveryLatitude}
            longitude={task.deliveryLongitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelectedTask(task)
            }}
          >
            🏠
          </Marker>
        </div>
      ))}
      {selectedTask && (
        <Popup
          latitude={selectedTask.pickupLatitude}
          longitude={selectedTask.pickupLongitude}
          onClose={() => setSelectedTask(null)}
          closeOnClick={false}
        >
          <div className="p-2">
            <h3 className="font-bold">{selectedTask.title}</h3>
            <p>Pickup: {selectedTask.pickupAddress}</p>
            <p>Delivery: {selectedTask.deliveryAddress}</p>
            <p className="font-semibold">${selectedTask.payment.toFixed(2)}</p>
            <Button className="mt-2" onClick={() => alert(`Delivery ${selectedTask.id} accepted!`)}>
              Accept Delivery
            </Button>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  )
}

