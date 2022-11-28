import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api"
import { useRef, useState } from "react"

export default function Maps() {
  const [map, setMap] = useState<any>(null)
  const [directionsResponse, setDirectionsResponse] = useState<any>(null)
  const [points, setPoints] = useState<any>([])

  const originRef = useRef<any>()
  const destinationRef = useRef<any>()

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places", "geometry"],
  })

  const center = {
    lat: -23.552762808973018,
    lng: -46.83735425165352,
  }

  async function calculateRoute() {
    const latLng = new google.maps.Geocoder()
    const waypoint = await latLng.geocode({
      address: "Rua João Teixeira Lacerda, 179, Vila Veloso, Carapicuíba",
    })

    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      waypoints: [
        {
          location: waypoint.results[0].geometry.location,
          stopover: true,
        },
      ],
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.PESSIMISTIC,
      },
    })

    setDirectionsResponse(results)
    setPoints(results.routes[0].legs)
    console.log(results.routes[0].legs)
  }

  return isLoaded ? (
    <div className="h-full w-full">
      <div className="flex">
        <Autocomplete>
          <input
            type="text"
            ref={originRef}
            className="text-black rounded-md"
          />
        </Autocomplete>
        <Autocomplete>
          <input
            type="text"
            ref={destinationRef}
            className="text-black rounded-md"
          />
        </Autocomplete>
        <button onClick={calculateRoute}>calcular</button>
      </div>
      <div>
        <ul className="mb-4 text-black">
          {points.map((point: any, index: number) => (
            <li key={index} className="bg-gray-400 rounded-lg mt-2 py-2 px-4">
              {point.start_address} - {point.end_address} -{" "}
              {point.duration.text}
            </li>
          ))}
        </ul>
      </div>
      <GoogleMap
        mapContainerStyle={{ width: "80%", height: "80%" }}
        center={center}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  )
}
