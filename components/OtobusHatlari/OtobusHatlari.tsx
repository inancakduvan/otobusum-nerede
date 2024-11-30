"use client";

import styles from "./otobusHatlari.module.scss";

import data from "../../data/eshot-otobus-hatlari.json";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowRight, FaBus, FaHeart, FaLine, FaSearch } from "react-icons/fa";

const OtobusHatlari = () => {
    const router = useRouter();
    const [searchedValue, setSearchedValue] = useState("");
    const [favs, setFavs] = useState([]);
    const [isShowFavs, setIsShowFavs] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const fuseOptions = {
        keys: ["HAT_ADI", "HAT_NO"],
        threshold: 0.5
    };

    useEffect(() => {
        const localFavs = localStorage.getItem("IA_otobusum_nerede_favs");
        const favs = localFavs ? JSON.parse(localFavs) : [];
        setFavs(favs);
    }, [])
    
    const fuse = useMemo(() => {
        return new Fuse(data, fuseOptions);
    }, [data]);

    const searchResults: Array<any> = useMemo(() => {
        return fuse.search(searchedValue).map((item) => item.item);
    }, [fuse, searchedValue]);

    const getFavItemInfo = (fav: string) => {
        const array = fav.trim().split("-");

        return {
            busNo: array[0],
            stationName: array[1],
            direction: array[2],
            stationId: array[3]
        }
    }

    const getFavItemUrl = (fav: string) => {
        const info: any = getFavItemInfo(fav);

        return "/yaklasanotobusler/" + info.stationName + "/" + info.busNo + "/" + (info.direction === "Gidiş" ? "1" : 2) + "/" + info.stationId
    }

    return (<>
        <div className={styles.wrapper}>
            <div className={styles.header}>{isShowFavs ? "FAVORİLERİNİZ" : "HAT SEÇİNİZ"}</div>

            {
                !isShowFavs && <div className={styles.search}>
                    <div className={styles.searchIcon}><FaSearch size={16} /></div>
                    <input ref={inputRef} type="text" placeholder="Otobüs numarasını veya hat adını giriniz..." onInput={() => setSearchedValue(inputRef.current!.value)} />
                </div>
            }
            
            {
                !isShowFavs ?
                <div className={styles.list}>
                    {
                        (searchResults.length === 0 ? data : searchResults).map((item) => <div key={"otobus-hatlari-" + item.HAT_NO} className={styles.listItem} onClick={() => router.push("/hat/" + item.HAT_NO)}> 
                            <div className={styles.busNo}>{item.HAT_NO}</div> <div className={styles.busName}>({item.HAT_ADI})</div>
                        </div>)
                    }
                </div> 
                :
                <div className={styles.list}>
                    {
                        favs.length > 0 ?
                        favs.map((item) => <div key={"favs-" + item} className={styles.listItem} onClick={() => router.push(getFavItemUrl(item))}> 
                            <div className={styles.busName + " " + styles.favItemWrapper}>
                                <div className={styles.favItemName}>
                                    <span>{getFavItemInfo(item).busNo}</span> <span className={styles.favItemIcon}></span>
                                    {getFavItemInfo(item).stationName} <span className={styles.favItemIcon}></span>
                                    {getFavItemInfo(item).direction}
                                </div>

                                <div className={styles.favItemRight}><FaArrowRight size={20} /></div>
                            </div>
                        </div>)
                        :
                        <div className={styles.noData}>{"Favorilerinize eklenmiş bir güzergah bulunmuyor."}</div>
                    }
                </div> 
            }

            <div className={styles.showFavsButton + " " + (isShowFavs ? styles.active : "") } onClick={() => setIsShowFavs(!isShowFavs)}>
                {!isShowFavs ? <FaHeart /> : <FaBus />}
                {!isShowFavs ? "Favorileri göster" : "Tüm Hatları Göster"}
            </div>
        </div>
    </>)
}

export default OtobusHatlari;