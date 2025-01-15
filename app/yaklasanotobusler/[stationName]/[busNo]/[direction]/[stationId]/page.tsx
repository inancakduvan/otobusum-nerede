import Header from "@/components/arriving-buses/header";
import ArrivingBusesList from "@/components/arriving-buses/list";
import BusStationsContextProvider from "@/context/bus-stations";

interface ArrivingBusesPageProps {
    params: Promise<{
        stationId: string;
        busNo: number;
        direction: string;
    }>;
}

export default async function ArrivingBusesPage({ params }: ArrivingBusesPageProps) {
    const { stationId, busNo, direction } = await params;

    return (
        <BusStationsContextProvider>
            <Header />
            <ArrivingBusesList stationId={stationId} busNo={busNo} direction={direction} />
        </BusStationsContextProvider>
    )
}