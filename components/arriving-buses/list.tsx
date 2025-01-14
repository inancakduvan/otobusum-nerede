import styles from "./style.module.scss";
import data from "../../data/eshot-bus-stations.json";

import { Suspense } from "react";
import { fetchArrivingBuses, fetchDestinationInfoOfTargetBus } from "@/requests"
import { ArrivingBus, StationOfTargetBus } from "@/types";
import { FaBiking, FaBus, FaClock, FaWheelchair } from "react-icons/fa";
import { convertTimeLeft } from "@/utils";

interface ArrivingBusesListProps {
    stationId: string;
    busNo: number;
    direction: string;
}

function Skeletton() {
    return (
        <div className="skeletton--isloading">
            <div className="loading-content">
                <div className="loading-text-container">
                    <div className="loading-main-text"></div>
                    <div className="loading-sub-text"></div>
                </div>
                <div className="loading-btn"></div>
            </div>
        </div>
    )
}

export default async function ArrivingBusesList({ stationId, busNo, direction }: ArrivingBusesListProps) {
    const arrivingBuses = await fetchArrivingBuses(stationId)

    const targetArrivingBus = arrivingBuses.find((item: ArrivingBus) => item.HatNumarasi.toString() === busNo.toString() && (item.KoorX !== "0" || item.KoorY !== "0"));
    const otherArrivingBuses = arrivingBuses.filter((item: ArrivingBus) => item.HattinYonu.toString() == direction && item.HatNumarasi.toString() !== busNo.toString());
    const station = data.find((item: StationOfTargetBus) => item.DURAK_ID.toString() === stationId);

    const destinationInfoOfTargetBus = (targetArrivingBus && station) ? await fetchDestinationInfoOfTargetBus(targetArrivingBus, station) : undefined;

    let targetArrivingBusInfo = undefined;

    if (destinationInfoOfTargetBus && destinationInfoOfTargetBus.routes && destinationInfoOfTargetBus.routes.length > 0) {
        if (destinationInfoOfTargetBus.routes[0].legs && destinationInfoOfTargetBus.routes[0].legs.length > 0) {
            targetArrivingBusInfo = destinationInfoOfTargetBus.routes[0].legs[0];
        }
    }

    return (
        <Suspense fallback={<Skeletton />}>
            <>
                {
                    targetArrivingBus ?
                        <div key={"target-arriving-bus-" + targetArrivingBus.HatNumarasi} className={styles.bus + " " + styles.target + " " + (targetArrivingBus.HatNumarasi == busNo ? styles.active : '')}>
                            <div className={styles.top}>
                                <div className={styles.left}>
                                    <div className={styles.busNo}>{targetArrivingBus.HatNumarasi}</div>

                                    {targetArrivingBus.BisikletAparatliMi && <div className={styles.bikeIcon}><FaBiking /></div>}

                                    {targetArrivingBus.EngelliMi && <div className={styles.disabledIcon}><FaWheelchair /></div>}
                                </div>

                                <div className={styles.right}>
                                    <div className={styles.stationsLeft}>{targetArrivingBus.KalanDurakSayisi} durak</div>
                                </div>
                            </div>

                            {
                                targetArrivingBusInfo && <div className={styles.bottom}>
                                    <div className={styles.durationLeft}>
                                        <span className={styles.durationLeftKm}><span><FaBus /></span> ~ {targetArrivingBusInfo.distance.text}</span>
                                        <span className={styles.durationLeftTime}><span><FaClock /></span> ~ {convertTimeLeft(targetArrivingBusInfo.distance.value, targetArrivingBusInfo.duration.value)} dakika</span>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div className={styles.noDataTarget}>Yaklaşan <span>{busNo}</span> numaralı otobüs bulunmamaktadır.</div>
                }

                <div className={styles.othersTitle}>YAKLAŞAN DİĞER OTOBÜSLER</div>

                {
                    otherArrivingBuses.length > 0 ?
                        otherArrivingBuses.map((bus: ArrivingBus) => <div key={"other-arriving-buses-" + bus.HatNumarasi} className={styles.bus + " " + (bus.HatNumarasi == busNo ? styles.active : '')}>
                            <div className={styles.left}>
                                <div className={styles.busNo}>{bus.HatNumarasi}</div>

                                {bus.BisikletAparatliMi && <div className={styles.bikeIcon}><FaBiking /></div>}

                                {bus.EngelliMi && <div className={styles.disabledIcon}><FaWheelchair /></div>}
                            </div>

                            <div className={styles.right}>
                                <div className={styles.stationsLeft}>{bus.KalanDurakSayisi} durak</div>
                            </div>
                        </div>)
                        :
                        <div className={styles.noData}>Yaklaşan başka otobüs bulunmamaktadır.</div>
                }
            </>
        </Suspense>
    )
}