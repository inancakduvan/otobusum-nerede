import OtobusHatlari from "@/components/OtobusHatlari/OtobusHatlari";
import { useLayoutEffect } from "react";

export default function Otobusler() {
    useLayoutEffect(() => {
        const resizeOps = () => {
            document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
        };

        resizeOps();
        window.addEventListener("resize", resizeOps);
    }, [])

    return (
        <OtobusHatlari />
    );
}
