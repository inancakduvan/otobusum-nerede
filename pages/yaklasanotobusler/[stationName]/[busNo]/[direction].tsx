import YaklasanOtobusler from "@/components/YaklasanOtobusler/YaklasanOtobusler";
import Head from "next/head";
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
        <>
            <Head>
            <title>Otobüsüm Nerede</title>
            <meta name="description" content="Otobüsüm Nerede" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <YaklasanOtobusler />
        </>
    );
}
