"use client";

import styles from "./style.module.scss";

import { useBusLinesContext } from "@/context/bus-lines";

import Header from "./header";
import Lines from "./lines";
import Favs from "./favs";

import { FaBus, FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import { StorageKeys } from "@/enums";

export default function BusLines() {
    const { isShowFavs, setIsShowFavs, setFavs } = useBusLinesContext();

    useEffect(() => {
        const localFavs = localStorage.getItem(StorageKeys.BusLinesFavs);
        const favs = localFavs ? JSON.parse(localFavs) : [];

        setFavs(favs);    
    }, [])
    
    return (
        <div className="wrapper">
            <Header />

            {
                !isShowFavs ?
                <Lines />
                :
                <Favs />
            }

            <div className={styles.showFavsButton + " " + (isShowFavs ? styles.active : "") } onClick={() => setIsShowFavs(!isShowFavs)}>
                {!isShowFavs ? <FaHeart /> : <FaBus />}
                {!isShowFavs ? "Favorileri Göster" : "Tüm Hatları Göster"}
            </div>
        </div>
    )
}