import styles from "./style.module.scss";
import data from "../../data/eshot-bus-lines.json";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import Fuse from "fuse.js";

import { BusLines } from "@/types";
import { useBusLinesContext } from "@/context/bus-lines";

export default function Lines() {
    const { valueToFilter, setValueToFilter } = useBusLinesContext();

    const router = useRouter();

    const fuseOptions = {
        keys: ["HAT_ADI", "HAT_NO"],
        threshold: 0.5
    };

    const fuse = useMemo(() => {
        return new Fuse(data, fuseOptions);
    }, [data]);

    const filteredResult: BusLines = useMemo(() => {
        return fuse.search(valueToFilter).map((item) => item.item);
    }, [fuse, valueToFilter]);

    return (
        <div className={styles.list}>
            {
            (filteredResult.length === 0 ? data : filteredResult).map((item) => <div key={"bus-lines-" + item.HAT_NO} className={styles.listItem} onClick={() => router.push("/hat/" + item.HAT_NO)}>
                <div className={styles.busNo}>{item.HAT_NO}</div> <div className={styles.busName}>{item.HAT_ADI}</div>
            </div>)
            }
        </div>
    )
}