import styles from "./style.module.scss";

import { useRouter } from "next/navigation";
import { useBusLinesContext } from "@/context/bus-lines";
import { FaArrowRight, FaDotCircle } from "react-icons/fa";
import { BusLinesFav } from "@/types";
import { BusDirections } from "@/enums";

import ProgressBar from "../core/progress-bar";

export default function Favs() {
    const { favs } = useBusLinesContext();

    const router = useRouter();

    const getFavItemUrl = (fav: BusLinesFav) => {
        return "/yaklasanotobusler/" + fav.stationName + "/" + fav.busNo + "/" + (fav.direction === BusDirections.Gidiş ? BusDirections.Gidiş : BusDirections.Dönüş) + "/" + fav.stationId;
    }
    
    return (
        <>
        <ProgressBar top="56px" />

        <div className={styles.list}>
            {
                favs.length > 0 ?
                favs.map((item: BusLinesFav) => <div key={"bus-line-favs-" + item.stationId + item.busNo} className={styles.listItem} onClick={() => router.push(getFavItemUrl(item))}> 
                    <div className={styles.busName + " " + styles.favItemWrapper}>
                        <div className={styles.favItemName}>
                            <span>{item.busNo}</span> <span className={styles.favItemIcon}><FaDotCircle size={4} /><FaDotCircle size={4} /><FaDotCircle size={4} /></span>
                            {item.stationName} <span className={styles.favItemIcon}><FaDotCircle size={4} /><FaDotCircle size={4} /><FaDotCircle size={4} /></span>
                            {item.busDirectionStart ? 
                                (item.direction === BusDirections.Gidiş ? 
                                    <span className={styles.favItemNameDirection}>
                                        {item.busDirectionStart}{<FaArrowRight size={8} />}{item.busDirectionEnd}
                                    </span>
                                    : 
                                    <span className={styles.favItemNameDirection}>
                                        {item.busDirectionEnd}{<FaArrowRight size={8} />}{item.busDirectionStart}
                                    </span>
                                ) 
                                : 
                                (item.direction === BusDirections.Gidiş ? "Gidiş" : "Dönüş")}
                        </div>

                        <div className={styles.favItemRight}><FaArrowRight size={20} /></div>
                    </div>
                </div>)
                :
                <div className={styles.noData}>{"Favorilerinize eklenmiş bir güzergah bulunmuyor."}</div>
            }
        </div> 
        </>
    )
}