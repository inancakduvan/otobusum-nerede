import YaklasanOtobusler from "@/components/YaklasanOtobusler/YaklasanOtobusler";
import { useLayoutEffect } from "react";

export default function Yaklasanlar() {
    useLayoutEffect(() => {
        const resizeOps = () => {
            document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
        };

        resizeOps();
        window.addEventListener("resize", resizeOps);
    }, [])

    return (
        <YaklasanOtobusler />
    );
}
