"use client";

import { useEffect } from "react";
import styles from "./otobusDuraklari.module.scss";

import data from "../../data/eshot-otobus-duraklari.json";
import { useRouter } from "next/navigation";

const OtobusDuraklari = ({ busNo } : { busNo: string }) => {
    const router = useRouter();

    function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
        const R = 6371; // Dünya'nın yarıçapı (km)
        const toRad = (value: any) => (value * Math.PI) / 180;
    
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
                Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Mesafeyi km cinsinden döndürür
    }
    
    // En uygun sıralamayı bulma
    function findOptimalRoute(coordinates: any) {
        const route = [];
        const remaining = [...coordinates];
    
        // İlk noktayı al
        let current = remaining.shift();
        route.push(current);
    
        while (remaining.length > 0) {
            // En yakın noktayı bul
            let nearestIndex = 0;
            let nearestDistance = calculateDistance(
                current.lat,
                current.lon,
                remaining[0].lat,
                remaining[0].lon
            );
    
            for (let i = 1; i < remaining.length; i++) {
                const distance = calculateDistance(
                    current.lat,
                    current.lon,
                    remaining[i].lat,
                    remaining[i].lon
                );
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestIndex = i;
                }
            }
    
            // En yakın noktayı rota ve mevcut nokta olarak ayarla
            current = remaining.splice(nearestIndex, 1)[0];
            route.push(current);
        }
    
        return route;
    }

    useEffect(() => {
        const _stations = [];
        
        for(let item of data) {
            const itemStations = item.DURAKTAN_GECEN_HATLAR.split("-");
            if (itemStations.includes(busNo.toString())) {
                _stations.push(item);
            }
        }

        const _coordinates = _stations.map((item) => {
            let _item: any = Object.assign({}, item);
            _item.lat = item.ENLEM;
            _item.lon = item.BOYLAM;

            return _item;
        })

        const optimalRoute = findOptimalRoute(_coordinates);
        console.log(optimalRoute);
    }, [])

    return (<>
        <div className={styles.wrapper}>
            <div className={styles.header}>DURAK SEÇİNİZ</div>
            <div className={styles.list}>
                {
                    // data.map((item) => <div className={styles.listItem} onClick={() => router.push("/hat/" + item.HAT_NO)}> 
                    //     <div className={styles.busNo}>{item.HAT_NO}</div> <div className={styles.busName}>({item.HAT_ADI})</div>
                    // </div>)
                }
            </div>
        </div>
    </>)
}

export default OtobusDuraklari;