"use client";

import styles from "./otobusDuraklari.module.scss";

const OtobusDuraklari = ({ busNo } : { busNo: string }) => {
    return (<>
        <div className={styles.wrapper}>
            <div className={styles.header}>DURAK SEÇİNİZ {busNo}</div>
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