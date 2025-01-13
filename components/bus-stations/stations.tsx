import styles from "./style.module.scss";

import dataBusStationsToDirection1 from "../../data/eshot-bus-stations-to-direction-1.json";
import dataBusStationsToDirection2 from "../../data/eshot-bus-stations-to-direction-2.json";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useBusStationsContext } from "@/context/bus-stations";
import { BusDirections } from "@/enums";
import { BusStations, BusStation } from "@/types";

import Fuse from "fuse.js";

export default function Stations() {
    const router = useRouter();
    const params = useParams();

    const { showStationsToDirection1, valueToFilter } = useBusStationsContext();
    
    const { busNo } = params;

    const [currentStations, setCurrentStations] = useState<BusStations>([]);
    
    const fuseOptions = {
        keys: ["Adi", "DurakId"],
        threshold: 0.5
    };
    
    const fuse = useMemo(() => {
        return new Fuse(currentStations, fuseOptions);
    }, [currentStations]);

    const filteredResult: BusStations = useMemo(() => {
        return fuse.search(valueToFilter).map((item) => item.item);
    }, [fuse, valueToFilter]);

    useEffect(() => {
        if (busNo && typeof busNo === "string") {
            const targetStations = showStationsToDirection1 ? dataBusStationsToDirection1 : dataBusStationsToDirection2;
            const stationsToDirection = targetStations as { [key: string]: BusStations };

            setCurrentStations(stationsToDirection[busNo]);
        }
    }, [busNo, showStationsToDirection1])

    return (
        <div className={styles.list}>
            {
                (filteredResult.length === 0 ? currentStations : filteredResult).map((item: BusStation, index: number) => <div key={"stationName" + item + index} className={styles.listItem} onClick={() => router.push("/yaklasanotobusler/" + item.Adi + "/" + busNo + "/" + (showStationsToDirection1 ? BusDirections.Gidiş : BusDirections.Dönüş) + "/" + item.DurakId)}> 
                    {item.Adi}
                </div>)
            }
        </div>
    )
}