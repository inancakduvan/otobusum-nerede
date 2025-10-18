"use client";

import styles from "./style.module.scss";
import data from "../../data/eshot-bus-lines.json";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBusStationsContext } from "@/context/bus-stations";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { BusLinesFav } from "@/types";
import { BusDirections, StorageKeys } from "@/enums";

export default function Header() {
    const [isFav, setIsFav] = useState(false);

    const router = useRouter();
    const params = useParams();

    const { busDirectionStart, setBusDirectionStart, busDirectionEnd, setBusDirectionEnd } = useBusStationsContext();
    
    const { busNo, stationName, direction, stationId } = params;

    const getDecodedStationName = () => {
        return stationName && typeof stationName === "string" ? decodeURIComponent(stationName) : "";
    }

    const getLineToAddToFavs = () => {
        return {
            busNo,
            stationName: getDecodedStationName(),
            direction,
            stationId,
            busDirectionStart,
            busDirectionEnd,
        }
    }

    const addLineToFavs = () => {
        const localFavs = localStorage.getItem(StorageKeys.BusLinesFavs);
        const favs = localFavs ? JSON.parse(localFavs) : [];
        const lineToAddToFavs = getLineToAddToFavs();

        if (favs) {
            if (isFav) {
                    const newFavs = favs.filter((item: BusLinesFav) => item.stationId !== lineToAddToFavs.stationId && item.stationName !== lineToAddToFavs.stationName);

                    localStorage.setItem(StorageKeys.BusLinesFavs, JSON.stringify(newFavs));
            } else {
                localStorage.setItem(StorageKeys.BusLinesFavs, JSON.stringify([...favs, lineToAddToFavs]));
            }
        }

        setIsFav(!isFav);
    }

    useEffect(() => {
        if (busNo && typeof busNo === "string") {
            const localFavs = localStorage.getItem(StorageKeys.BusLinesFavs);
            const favs = localFavs ? JSON.parse(localFavs) : [];
            const lineToAddToFavs = getLineToAddToFavs();
            const isAlreadyAddedToFavs = favs.find((item: BusLinesFav) => item.stationId === lineToAddToFavs.stationId && item.stationName === lineToAddToFavs.stationName);
    
            setIsFav(isAlreadyAddedToFavs ? true : false);

            const bus = data.find((item) => item.HAT_NO.toString() === busNo);
            
            if (bus) {
                setBusDirectionStart(bus.HAT_BASLANGIC);
                setBusDirectionEnd(bus.HAT_BITIS);
            }
        }
    }, [busNo])
    
    return (
        <>
        <div className="breadcrumbs">
            <div className="breadcrumbs-item" onClick={() => router.push("/")}>{busNo} Numaralı Otobüs</div>
            <div className="breadcrumbs-icon"><FaArrowRight size={12} /></div>
            <div className="breadcrumbs-item" onClick={() => router.push("/hat/" + busNo)}>Durak Seçiniz</div>
            <div className="breadcrumbs-icon"><FaArrowRight size={12} /></div>
            <div className="breadcrumbs-item">Yaklaşan Otobüsler</div>
        </div>

        <div className={styles.header}>
            <span className={styles.backButton} onClick={() => router.push("/hat/" + busNo)}><FaArrowLeft /></span>
            <span className={styles.stationName}>{getDecodedStationName()} Durağı</span>
            { (busDirectionStart && busDirectionEnd) && <div className={styles.busDirection}>
                {direction === BusDirections.Gidiş ? busDirectionStart : busDirectionEnd} <span><FaArrowRight size={8} /></span> 
                {direction === BusDirections.Gidiş ? busDirectionEnd : busDirectionStart}
            </div>}

            <span className={styles.favButton + " " + (isFav ? styles.active : "")} onClick={addLineToFavs}><FaHeart /></span>
        </div>
        </>
    )
}