"use client";

import styles from "./style.module.scss";

import { useBusLinesContext } from "@/context/bus-lines";

import Header from "./header";
import Lines from "./lines";
import Favs from "./favs";

import { FaBus, FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import { StorageKeys } from "@/enums";
import InstallButton from "./install-button";
import { MdClose } from "react-icons/md";

export default function BusLines() {
    const { isShowFavs, setIsShowFavs, setFavs, isShowIosModal, setIsShowIosModal } = useBusLinesContext();

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

            <div className={styles.bottomButtons}>
                <div className={styles.showFavsButton + " " + (isShowFavs ? styles.active : "") } onClick={() => setIsShowFavs(!isShowFavs)}>
                    {!isShowFavs ? <FaHeart /> : <FaBus />}
                    {!isShowFavs ? "Favorileri Göster" : "Tüm Hatları Göster"}
                </div>
                
                <InstallButton />
            </div>

            {isShowIosModal && <div className={styles.iosModal} onClick={() => setIsShowIosModal(false)}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.title}>Ana Ekranına Ekle</div>
                        <div className={styles.close} onClick={() => setIsShowIosModal(false)}><MdClose /></div>
                    </div>
                    
                    <div className={styles.description}>
                        Uygulamayı ana ekranınıza ekleyin, daha hızlı erişim ve 
                        tam bir uygulama deneyimi yaşayın! Aşağıdaki adımları izleyerek kolayca ekleyebilirsiniz:
                    </div>

                    <ul>
                        <li>Alt bardaki Paylaş (Share) butonuna (yukarı ok işareti olan kutu) dokunun.</li>

                        <li> Açılan menüde aşağı kaydırıp "Ana Ekrana Ekle" seçeneğini bulun ve seçin.</li>

                        <li>Açılan ekranda isterseniz ismi düzenleyin, sonra "Ekle" butonuna basın.</li>
                    </ul>
                </div>
            </div> }
        </div>
    )
}