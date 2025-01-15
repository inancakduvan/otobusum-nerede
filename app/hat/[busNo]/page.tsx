import BusStations from "@/components/bus-stations";
import BusStationsContextProvider from "@/context/bus-stations";

export default function BusStationsPage() {
  return (
    <BusStationsContextProvider>
      <BusStations />
    </BusStationsContextProvider>
  )
}