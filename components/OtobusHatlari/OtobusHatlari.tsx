"use client";

import { useEffect } from "react";
import styles from "./otobusHatlari.module.scss";

import data from "../../data/eshot-otobus-hatlari.json";
import { useRouter } from "next/navigation";

const OtobusHatlari = () => {
    const router = useRouter();

    const getDownloads = async () => {
        fetch("/api/crawler");
      }
    

    useEffect(() => {

        getDownloads();

    }, [])

    return (<>
        <div className={styles.wrapper}>
            <div className={styles.header}>HAT SEÇİNİZ</div>
            <div className={styles.list}>
                {
                    data.map((item) => <div key={"otobus-hatlari-" + item.HAT_NO} className={styles.listItem} onClick={() => router.push("/hat/" + item.HAT_NO)}> 
                        <div className={styles.busNo}>{item.HAT_NO}</div> <div className={styles.busName}>({item.HAT_ADI})</div>
                    </div>)
                }
            </div>
        </div>
    </>)
}

export default OtobusHatlari;