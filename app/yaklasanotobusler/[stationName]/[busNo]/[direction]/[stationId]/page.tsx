import Header from "@/components/arriving-buses/header";
import ArrivingBusesList from "@/components/arriving-buses/list";

interface ArrivingBusesPageProps {
    params: {
      stationId: string;
      busNo: number;
      direction: string;
    };
}

export default async function ArrivingBusesPage({ params }: ArrivingBusesPageProps) {
    return (
        <div>
            <Header />
            <ArrivingBusesList stationId={params.stationId} busNo={params.busNo} direction={params.direction} />
        </div>
    )
}