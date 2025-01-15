import styles from "./style.module.scss";

import { useRef } from "react";
import { useBusLinesContext } from "@/context/bus-lines";

import { FaArrowLeft, FaSearch } from "react-icons/fa";

export default function BusLinesHeader() {
    const { isShowFavs, setIsShowFavs, setValueToFilter } = useBusLinesContext();

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
        <div className={styles.header}>
            {isShowFavs && <span className={styles.backButton} onClick={() => setIsShowFavs(false)}><FaArrowLeft /></span>}
            {isShowFavs ? "FAVORİLERİNİZ" : "HAT SEÇİNİZ"}
        </div> 

        {
            !isShowFavs && <div className={styles.search}>
                <div className={styles.searchIcon}><FaSearch size={16} /></div>
                <input ref={inputRef} type="text" placeholder="Otobüs numarasını veya hat adını giriniz..." onInput={() => setValueToFilter(inputRef.current!.value)} />
            </div>
        }
        </>
    )
}