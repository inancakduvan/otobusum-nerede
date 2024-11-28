import { useRouter } from "next/router";
import data from "../../data/eshot-otobus-duraklari.json";

import styles from "./yaklasanOtobusler.module.scss";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaBiking, FaWheelchair } from "react-icons/fa";

const YaklasanOtobusler = () => {
    const router = useRouter();
    const stationName = router.query.stationName ? router.query.stationName.toString() : "";
    const busNo = router.query.busNo ? router.query.busNo.toString() : "";
    const direction = router.query.direction ? router.query.direction.toString() : "";

    const [busComings, setBusComings] = useState<Array<any>>([]);

        const fetchData = async (fetches: any) => {
            try {
                const correctDirections: any = {
                    "gidis": 1,
                    "donus": 2
                }

                const correctDirection: any = correctDirections[direction];

                const jsons = fetches.map((item: any) => fetch(item.url))

                const responsesJSON = await Promise.all(jsons);
                const responses = (await Promise.all(responsesJSON.map(r => r.json()))).flat();
                const successfulResponses = responses.filter((item: any) => !item.message);
                const filteredResponse =  correctDirection ? successfulResponses.filter((item: any) => item.HattinYonu === correctDirection) : [];
                
                const uniqueData = filteredResponse.reduce((acc, current) => {
                    const isDuplicate = acc.some((item: any) => item.HatNumarasi === current.HatNumarasi);
                  
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
    return (
        <>
            <div className={styles.header}>
                <span className={styles.backButton} onClick={() => router.push("/hat/" + busNo)}><FaArrowLeft /></span>
                {stationName} Durağı
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
                    "Yaklaşan otobüs bulunmamaktadır"
                }
            </div>
        </>
    )
}

export default YaklasanOtobusler;