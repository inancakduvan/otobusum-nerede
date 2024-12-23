"use client";

import { useRouter } from "next/router";
import styles from "./otobusDuraklari.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";
import data from "../../data/eshot-otobus-hatlari.json";
import dataDuraklar1 from "../../data/duraklar1.json";
import dataDuraklar2 from "../../data/duraklar2.json";


const OtobusDuraklari = () => {
    const router = useRouter();
    const busNo = router.query.busNo ? router.query.busNo.toString() : "";

    const [stations1, setStations1] = useState<Array<any>>([]);
    const [stations2, setStations2] = useState<Array<any>>([]);
    const [currentStations, setCurrentStations] = useState<Array<any>>([]);
    const [showStations1, setShowStations1] = useState<boolean>(true);
    const [searchedValue, setSearchedValue] = useState("");
    const [busDirectionStart, setBusDirectionStart] = useState("");
    const [busDirectionEnd, setBusDirectionEnd] = useState("");
    const [isStationsLoaded, setStationsLoaded] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (busNo) {
            const bus = data.find((item) => item.HAT_NO.toString() === busNo);
            
            if (bus) {
                setBusDirectionStart(bus.HAT_BASLANGIC);
                setBusDirectionEnd(bus.HAT_BITIS);
            }

            // @ts-ignore
            const duraklar1 = dataDuraklar1[busNo];
            setStations1(duraklar1);

            // @ts-ignore
            const duraklar2 = dataDuraklar2[busNo];
            setStations2(duraklar2);

            // fetch("/api/duraklar1?busNo=" + busNo).then(function(response) { return response.json(); })
            // .then(function(json) {
                
            // });

            // fetch("/api/duraklar2?busNo=" + busNo).then(function(response) { return response.json(); })
            // .then(function(json) {
            //     setStations2(json);
            // });
        }
    }, [busNo])

    useEffect(() => {
        if (showStations1) {
            setCurrentStations(stations1);
        } else {
            setCurrentStations(stations2);
        }

        if (stations1.length > 0 && stations2.length > 0) {
            setStationsLoaded(true);
        }
    }, [showStations1, stations1, stations2])
    
    const fuseOptions = {
        keys: ["Adi", "DurakId"],
        threshold: 0.5
    };
    
    const fuse = useMemo(() => {
        return new Fuse(currentStations, fuseOptions);
    }, [currentStations]);

    const searchResults: Array<any> = useMemo(() => {
        return fuse.search(searchedValue).map((item) => item.item);
    }, [fuse, searchedValue]);

    return (<>
        <div className={styles.wrapper}>
            <div className="breadcrumbs">
                <div className="breadcrumbs-item" onClick={() => router.push("/duraklar")}>{busNo} Numaralı Otobüs</div>
                <div className="breadcrumbs-icon"><FaArrowRight size={12} /></div>
                <div className="breadcrumbs-item">Durak Seçiniz</div>
            </div>

            <div className={styles.header}>
                <span className={styles.backButton} onClick={() => router.push("/duraklar")}><FaArrowLeft /></span>
                DURAK SEÇİNİZ
                { (busDirectionStart && busDirectionEnd) && <div className={styles.busDirection}>
                    {busDirectionStart} <span><FaArrowRight size={8} /></span> {busDirectionEnd}
                </div>}
            </div>

            <div className={styles.selectDirection}>
                <div className={styles.selectDirectionItem + " " + (showStations1 ? styles.active : '')} onClick={() => setShowStations1(true)}>GİDİŞ</div>
                <div className={styles.selectDirectionItem+ " " + (!showStations1 ? styles.active : '')} onClick={() => setShowStations1(false)}>DÖNÜŞ</div>
            </div>

            <div className={styles.search}>
                <div className={styles.searchIcon}><FaSearch size={16} /></div>
                <input ref={inputRef} type="text" placeholder="Durak adı giriniz..." onInput={() => setSearchedValue(inputRef.current!.value)} />
            </div>
                
            {
                !isStationsLoaded && <div className="skeletton--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                        <div className="loading-main-text"></div>
                        <div className="loading-sub-text"></div>
                        </div>
                        <div className="loading-btn"></div>
                    </div>
                </div>
            }

            <div className={styles.list}>
                {
                    (searchResults.length === 0 ? currentStations : searchResults).map((item: { DurakId: number, Adi: string }, index: number) => <div key={"stationName" + item + index} className={styles.listItem} onClick={() => router.push("/yaklasanotobusler/" + item.Adi + "/" + busNo + "/" + (showStations1 ? "1" : "2") + "/" + item.DurakId)}> 
                        {item.Adi}
                    </div>)
                }
            </div>
        </div>
    </>)
}

export default OtobusDuraklari;