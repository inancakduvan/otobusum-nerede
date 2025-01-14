import Header from "@/components/arriving-buses/header";
import ArrivingBusesList from "@/components/arriving-buses/list";

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
        <div>
            <Header />
            <ArrivingBusesList stationId={stationId} busNo={busNo} direction={direction} />
        </div>
    )
}