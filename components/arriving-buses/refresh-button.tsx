"use client";

import styles from "./style.module.scss";

import { IoIosRefresh } from "react-icons/io";

export default async function RefreshButton() {
    return <div className={styles.refreshButton} onClick={() => window.location.reload()}>
        <IoIosRefresh /> Yenile
    </div>
} 