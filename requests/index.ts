import { ArrivingBus, ArrivingBuses, BusStation, GoogleDirectionsResponse, StationOfTargetBus } from "@/types";

export const fetchArrivingBuses = async (stationId: string): Promise<ArrivingBuses> => {
    const data = await fetch(`https://openapi.izmir.bel.tr/api/iztek/duragayaklasanotobusler/${stationId}`).then((r) =>
      r.json()
    );
    return data;  
}

export const fetchDestinationInfoOfTargetBus = async (targetBus: ArrivingBus, station: StationOfTargetBus): Promise<GoogleDirectionsResponse> => {
    const data = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${targetBus.KoorX.split(",").join(".")},${targetBus.KoorY.split(",").join(".")}&destination=${station.ENLEM},${station.BOYLAM}&mode=driving&key=AIzaSyDjtWDYguFO-KBsU5rxdP4imQDi_ulp9Ek`).then((r) =>
      r.json()
    );
    return data;  
}