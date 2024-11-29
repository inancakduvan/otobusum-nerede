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
    const [busDirectionStart, setBusDirectionStart] = useState("");
    const [busDirectionEnd, setBusDirectionEnd] = useState("");

    // @typescript-eslint/no-explicit-any
    const [busComings, setBusComings] = useState<Array<any>>([]);

        const fetchData = async (fetches: Array<any>) => {
            try {
                const correctDirections: { "gidis": number, "donus": number} = {
                    "gidis": 1,
                    "donus": 2
                }

                const correctDirection = direction === "gidis" ? correctDirections.gidis : correctDirections.donus;

                const jsons = fetches.map((item: { url: string }) => fetch(item.url))

                const responsesJSON = await Promise.all(jsons);
                const responses = (await Promise.all(responsesJSON.map(r => r.json()))).flat();
                const failedResponse = responses.find((item: {message: string}) => item.message);

                if (failedResponse) {
                    return;
                }

                const successfulResponses = responses.filter((item: {message: string}) => !item.message);

                const filteredResponse =  correctDirection ? successfulResponses.filter((item: {HattinYonu: number}) => item.HattinYonu === correctDirection) : [];
                
                const uniqueData = filteredResponse.reduce((acc, current) => {
                    const isDuplicate = acc.some((item: { HatNumarasi: number }) => item.HatNumarasi === current.HatNumarasi);
                  
                    if (!isDuplicate) {
                      acc.push(current);
                    }
                    return acc;
                  }, []);

                setBusComings(uniqueData);
            } catch (err) {
                throw err;
            }
      };

    useEffect(() => {
        if (data.length === 0 || !stationName) {
            return;
        }

        let targetStations = data.filter((item) => item.DURAK_ADI.toLowerCase() == stationName.toLowerCase());
        targetStations = targetStations.filter((item) => {
            const buses = item.DURAKTAN_GECEN_HATLAR.split("-");

            return buses.includes(busNo);
        })

        const jsons = targetStations.map((item) => {
            return {
                url: "https://openapi.izmir.bel.tr/api/iztek/duragayaklasanotobusler/" + item.DURAK_ID,
                key: item.DURAK_ID
            }
        })

        fetchData(jsons);
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

            <div className={styles.busComings}>
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
                    <div className={styles.noData}>Yaklaşan otobüs bulunmamaktadır.</div>
                }
            </div>
        </div>
    )
}

export default YaklasanOtobusler;