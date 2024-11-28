"use client";

import { useRouter } from "next/router";
import styles from "./otobusDuraklari.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Fuse from "fuse.js";

const OtobusDuraklari = () => {
    const router = useRouter();
    const busNo = router.query.busNo ? router.query.busNo.toString() : "";

    const [stations1, setStations1] = useState<any>([]);
    const [stations2, setStations2] = useState<any>([]);
    const [currentStations, setCurrentStations] = useState<any>([]);
    const [showStations1, setShowStations1] = useState<boolean>(true);
    const [searchedValue, setSearchedValue] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    const getStations1 = async () => {
      fetch("/api/crawler?busNo=" + busNo).then(function(response) { return response.text(); })
      .then(function(text) {
            const stations = [];
            const ul = document.createElement("ul");
            const _text = `${text}`;

            ul.innerHTML = _text;
            const listItems = ul.querySelectorAll("li");

            for (let i = 0; i < listItems.length; i++) {
                const li = listItems[i];
                const stationName = li.querySelector(".station-name")?.textContent;
                stations.push(stationName);
            }

            setStations1(stations);
      });
    }

    const getStations2 = async () => {
      fetch("/api/crawler2?busNo=" + busNo).then(function(response) { return response.text(); })
      .then(function(text) {
        const stations = [];
        const ul = document.createElement("ul");
        const _text = `${text}`;

        ul.innerHTML = _text;
        const listItems = ul.querySelectorAll("li");

        for (let i = 0; i < listItems.length; i++) {
            const li = listItems[i];
            const stationName = li.querySelector(".station-name")?.textContent;
            stations.push(stationName);
        }

        setStations2(stations);
      });
    }

    useEffect(() => {
        if (busNo) {
            getStations1();
            getStations2();
        }
    }, [busNo])

    useEffect(() => {
        if (showStations1) {
            setCurrentStations(stations1);
        } else {
            setCurrentStations(stations2);
        }
    }, [showStations1, stations1, stations2])
    
    const fuseOptions = {
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
            <div className={styles.header}>
                <span className={styles.backButton} onClick={() => router.push("/duraklar")}><FaArrowLeft /></span>
                DURAK SEÇİNİZ
            </div>

            <div className={styles.selectDirection}>
                <div className={styles.selectDirectionItem + " " + (showStations1 ? styles.active : '')} onClick={() => setShowStations1(true)}>GİDİŞ</div>
                <div className={styles.selectDirectionItem+ " " + (!showStations1 ? styles.active : '')} onClick={() => setShowStations1(false)}>DÖNÜŞ</div>
            </div>

            <div className={styles.search}>
                <input ref={inputRef} type="text" placeholder="Durak adı giriniz..." onInput={() => setSearchedValue(inputRef.current!.value)} />
            </div>

            <div className={styles.list}>
                {
                    (searchResults.length === 0 ? currentStations : searchResults).map((item: string, index: number) => <div key={"stationName" + item + index} className={styles.listItem} onClick={() => router.push("/yaklasanotobusler/" + item + "/" + busNo + "/" + (showStations1 ? "gidis" : "donus"))}> 
                        {item}
                    </div>)
                }
            </div>
        </div>
    </>)
}

export default OtobusDuraklari;