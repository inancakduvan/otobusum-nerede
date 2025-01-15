import styles from "./style.module.scss";
import data from "../../data/eshot-bus-stations.json";

import { FaBus, FaClock } from "react-icons/fa";
import { convertTimeLeft } from "@/utils";
import { ArrivingBus, StationOfTargetBus } from "@/types";
import { fetchDestinationInfoOfTargetBus } from "@/requests";

interface MinutesLeftProps {
    targetArrivingBus: ArrivingBus,
    stationId: string
}

export default async function MinutesLeft({ targetArrivingBus, stationId } : MinutesLeftProps) {
    if (!targetArrivingBus || !stationId) {
        return null;
    }

    let targetArrivingBusInfo = undefined;

    const station = data.find((item: StationOfTargetBus) => item.DURAK_ID.toString() === stationId);
    const destinationInfoOfTargetBus = station ? await fetchDestinationInfoOfTargetBus(targetArrivingBus, station) : undefined;

    if (destinationInfoOfTargetBus && destinationInfoOfTargetBus.routes && destinationInfoOfTargetBus.routes.length > 0) {
        if (destinationInfoOfTargetBus.routes[0].legs && destinationInfoOfTargetBus.routes[0].legs.length > 0) {
            targetArrivingBusInfo = destinationInfoOfTargetBus.routes[0].legs[0];
        }
    }

    if (!targetArrivingBusInfo) {
        return null;
    }

    return (
        <div className={styles.bottom}>
            <div className={styles.durationLeft}>
                <span className={styles.durationLeftKm}><span><FaBus /></span> ~ {targetArrivingBusInfo.distance.text}</span>
                <span className={styles.durationLeftTime}><span><FaClock /></span> ~ {convertTimeLeft(targetArrivingBusInfo.distance.value, targetArrivingBusInfo.duration.value)} dakika</span>
            </div>
        </div>
    )
}