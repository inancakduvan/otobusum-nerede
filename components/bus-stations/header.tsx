import styles from "./style.module.scss";
import data from "../../data/eshot-bus-lines.json";

import { useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { useBusStationsContext } from "@/context/bus-stations";

import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

export default function Header() {
    const { showStationsToDirection1, setShowStationsToDirection1, busDirectionStart, setBusDirectionStart, busDirectionEnd, setBusDirectionEnd, setValueToFilter } = useBusStationsContext();

    const router = useRouter();
    const params = useParams();
    
    const inputRef = useRef<HTMLInputElement>(null);

    const { busNo } = params;

    useEffect(() => {
        if (busNo && typeof busNo === "string") {
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
            <div className="breadcrumbs-item">Durak Seçiniz</div>
        </div>

        <div className={styles.header}>
            <span className={styles.backButton} onClick={() => router.push("/")}><FaArrowLeft /></span>
            DURAK SEÇİNİZ
            { (busDirectionStart && busDirectionEnd) && <div className={styles.busDirection}>
                {busDirectionStart} <span><FaArrowRight size={8} /></span> {busDirectionEnd}
            </div>}
        </div>

        <div className={styles.selectDirection}>
            <div className={styles.selectDirectionItem + " " + (showStationsToDirection1 ? styles.active : '')} onClick={() => setShowStationsToDirection1(true)}>GİDİŞ</div>
            <div className={styles.selectDirectionItem+ " " + (!showStationsToDirection1 ? styles.active : '')} onClick={() => setShowStationsToDirection1(false)}>DÖNÜŞ</div>
        </div>

        <div className={styles.search}>
            <div className={styles.searchIcon}><FaSearch size={16} /></div>
            <input ref={inputRef} type="text" placeholder="Durak adı giriniz..." onInput={() => setValueToFilter(inputRef.current!.value)} />
        </div>
        </>
    )
}