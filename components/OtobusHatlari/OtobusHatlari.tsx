"use client";

import styles from "./otobusHatlari.module.scss";

import data from "../../data/eshot-otobus-hatlari.json";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import { useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const OtobusHatlari = () => {
    const router = useRouter();
    const [searchedValue, setSearchedValue] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     setStationsData(data);
    // }, [])

    const fuseOptions = {
        keys: ["HAT_ADI", "HAT_NO"],
        threshold: 0.5
    };
    
    const fuse = useMemo(() => {
        return new Fuse(data, fuseOptions);
    }, [data]);

    const searchResults: Array<any> = useMemo(() => {
        return fuse.search(searchedValue).map((item) => item.item);
    }, [fuse, searchedValue]);

    return (<>
        <div className={styles.wrapper}>
            <div className={styles.header}>HAT SEÇİNİZ</div>

            <div className={styles.search}>
                <div className={styles.searchIcon}><FaSearch size={16} /></div>
                <input ref={inputRef} type="text" placeholder="Otobüs numarasını veya hat adını giriniz..." onInput={() => setSearchedValue(inputRef.current!.value)} />
            </div>
            
            <div className={styles.list}>
                {
                    (searchResults.length === 0 ? data : searchResults).map((item) => <div key={"otobus-hatlari-" + item.HAT_NO} className={styles.listItem} onClick={() => router.push("/hat/" + item.HAT_NO)}> 
                        <div className={styles.busNo}>{item.HAT_NO}</div> <div className={styles.busName}>({item.HAT_ADI})</div>
                    </div>)
                }
            </div>
        </div>
    </>)
}

export default OtobusHatlari;