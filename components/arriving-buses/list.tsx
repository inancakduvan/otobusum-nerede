import styles from "./style.module.scss";

import { Suspense } from "react";

import { fetchArrivingBuses } from "@/requests"
import { ArrivingBus, BusStations } from "@/types";
import { FaBiking, FaWheelchair } from "react-icons/fa";

import MinutesLeft from "./minutes-left";
import Skeletton from "../core/skeletton";
import RefreshButton from "./refresh-button";

import dataBusStationsToDirection1 from "../../data/eshot-bus-stations-to-direction-1.json";
import dataBusStationsToDirection2 from "../../data/eshot-bus-stations-to-direction-2.json";

interface ArrivingBusesListProps {
    stationId: string;
    busNo: number;
    direction: string;
}

export default async function ArrivingBusesList({ stationId, busNo, direction }: ArrivingBusesListProps) {
    const arrivingBuses = await fetchArrivingBuses(stationId)

    const targetArrivingBus = arrivingBuses.find((item: ArrivingBus) => item.HatNumarasi.toString() === busNo.toString() && (item.KoorX !== "0" || item.KoorY !== "0"));
    const otherArrivingBuses = arrivingBuses.filter((item: ArrivingBus) => item.HattinYonu.toString() == direction && item.HatNumarasi.toString() !== busNo.toString());

    const targetStations = direction == '1' ? dataBusStationsToDirection1 : dataBusStationsToDirection2;
    const stationsToDirection = targetStations as { [key: string]: BusStations };
    const stations = stationsToDirection[busNo];
    const index = stations.findIndex((item) => item.DurakId.toString() === stationId);

    return (
        <Suspense fallback={<Skeletton />}>
            <div className={styles.listPageWrapper}>
                {
                    index !== 0 ?
                    targetArrivingBus ?
                        <>
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

                            <MinutesLeft targetArrivingBus={targetArrivingBus} stationId={stationId} moving={!(index == targetArrivingBus.KalanDurakSayisi)} />
                        </div>

                       {
                        index == targetArrivingBus.KalanDurakSayisi &&
                        <div className={styles.firstStationWarning}>* Otobüs henüz kalkış durağında bekliyor.</div>
                       } 
                        </>
                        :
                        <div className={styles.noDataTarget}>Yaklaşan <span>{busNo}</span> numaralı otobüs bulunmamaktadır.</div>
                    :
                    <div key={"target-arriving-bus-" + busNo} className={styles.bus + " " + styles.departureStation + " " + styles.target + " " + styles.active}>
                        <div className={styles.top}>
                            <div className={styles.left}>
                                <div className={styles.busNo}>{busNo}</div>
                            </div>

                            <div className={styles.right}>
                                <div className={styles.stationsLeft + " " + styles.stationsLeftSmall}>Şu anda kalkış durağındasınız.</div>
                            </div>
                        </div>
                    </div>
                }

                <div className={styles.othersTitle}>YAKLAŞAN DİĞER OTOBÜSLER</div>

                {
                    otherArrivingBuses.length > 0 ?
                        otherArrivingBuses.map((bus: ArrivingBus, index: number) => <div key={"other-arriving-buses-" + bus.HatNumarasi + index} className={styles.bus + " " + (bus.HatNumarasi == busNo ? styles.active : '')}>
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

                <RefreshButton />
            </div>
        </Suspense>
    )
}