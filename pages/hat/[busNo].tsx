import OtobusDuraklari from "@/components/OtobusDuraklari/OtobusDuraklari";
import { useLayoutEffect } from "react";

export default function Hat() {
    useLayoutEffect(() => {
        const resizeOps = () => {
            document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
        };

        resizeOps();
        window.addEventListener("resize", resizeOps);
    }, [])

    return (
        <OtobusDuraklari />
    );
}
