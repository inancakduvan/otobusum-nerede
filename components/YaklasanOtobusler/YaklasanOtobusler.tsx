import { useRouter } from "next/router";
import data from "../../data/eshot-otobus-duraklari.json";
import dataHatlar from "../../data/eshot-otobus-hatlari.json";

import styles from "./yaklasanOtobusler.module.scss";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBiking, FaWheelchair } from "react-icons/fa";

const YaklasanOtobusler = () => {
    const router = useRouter();
    const stationName = router.query.stationName ? router.query.stationName.toString() : "";
    const busNo = router.query.busNo ? router.query.busNo.toString() : "";
    const direction = router.query.direction ? router.query.direction.toString() : "";
    const stationId = router.query.stationId ? router.query.stationId.toString() : "";
    const [busDirectionStart, setBusDirectionStart] = useState("");
    const [busDirectionEnd, setBusDirectionEnd] = useState("");
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // @typescript-eslint/no-explicit-any
    const [busComings, setBusComings] = useState<Array<any>>([]);
    const [targetBus, setTargetBus] = useState<Array<any>>([]);

    const fetchData = () => {
        fetch("https://openapi.izmir.bel.tr/api/iztek/duragayaklasanotobusler/" + stationId).then(function(response) { return response.json(); })
        .then(function(json) {
            const targetBus = json.find((item: { HatNumarasi: number }) => item.HatNumarasi.toString() === busNo);
            const filteredResultBasedOnDirection = json.filter((item: { HattinYonu: string, HatNumarasi: number }) => item.HattinYonu == direction && item.HatNumarasi.toString() !== busNo);

            setBusComings(filteredResultBasedOnDirection);
            targetBus && setTargetBus([targetBus]);
            setIsDataLoaded(true);
        });
    };

    useEffect(() => {
        if (data.length === 0 || !stationName) {
            return;
        }

        fetchData();
    }, [data, stationName])
    
    useEffect(() => {
        if (busNo) {

            const bus = dataHatlar.find((item) => item.HAT_NO.toString() === busNo);
            
            if (bus) {
                setBusDirectionStart(bus.HAT_BASLANGIC);
                setBusDirectionEnd(bus.HAT_BITIS);
            }
        }
    }, [busNo])

    return (
        <div className={styles.wrapper}>
            <div className="breadcrumbs">
                <div className="breadcrumbs-item" onClick={() => router.push("/duraklar")}>{busNo} Numaralı Otobüs</div>
                <div className="breadcrumbs-icon"><FaArrowRight size={12} /></div>
                <div className="breadcrumbs-item" onClick={() => router.push("/hat/" + busNo)}>Durak Seçiniz</div>
                <div className="breadcrumbs-icon"><FaArrowRight size={12} /></div>
                <div className="breadcrumbs-item">Yaklaşan Otobüsler</div>
            </div>

            <div className={styles.header}>
                <span className={styles.backButton} onClick={() => router.push("/hat/" + busNo)}><FaArrowLeft /></span>
                <span className={styles.stationName}>{stationName} Durağı</span>
                { (busDirectionStart && busDirectionEnd) && <div className={styles.busDirection}>
                    {busDirectionStart} <span><FaArrowRight size={8} /></span> {busDirectionEnd}
                </div>}
            </div>
            
            {
                !isDataLoaded && <div className="skeletton--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                        <div className="loading-main-text"></div>
                        <div className="loading-sub-text"></div>
                        </div>
                        <div className="loading-btn"></div>
                    </div>
                </div>
            }

            <div className={styles.busComings}>
                {
                    targetBus.length > 0 ?
                    targetBus.map((bus) => <div key={"yaklasan-" + bus.HatNumarasi} className={styles.bus + " " + styles.target + " " + (bus.HatNumarasi == busNo ? styles.active : '')}>
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
                    isDataLoaded && <div className={styles.noDataTarget}>Yaklaşan <span>{busNo}</span> numaralı otobüs bulunmamaktadır.</div>
                }

                <div className={styles.othersTitle}>YAKLAŞAN DİĞER OTOBÜSLER</div>
                {
                    busComings.length > 0 ?
                    busComings.map((bus) => <div key={"yaklasan-" + bus.HatNumarasi} className={styles.bus + " " + (bus.HatNumarasi == busNo ? styles.active : '')}>
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
                    isDataLoaded && <div className={styles.noData}>Yaklaşan başka otobüs bulunmamaktadır.</div>
                }
            </div>
        </div>
    )
}

export default YaklasanOtobusler;