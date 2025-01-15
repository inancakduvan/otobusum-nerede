import styles from "./style.module.scss";

import { Suspense } from "react";
import { fetchArrivingBuses } from "@/requests"
import { ArrivingBus } from "@/types";
import { FaBiking, FaWheelchair } from "react-icons/fa";
import MinutesLeft from "./minutes-left";

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

                            <MinutesLeft targetArrivingBus={targetArrivingBus} stationId={stationId} />
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