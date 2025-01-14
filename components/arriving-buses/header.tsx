"use client";

import { useParams, useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export default function Header() {
    const router = useRouter();
    const params = useParams();

    const { busNo } = params;
    
    return (
        <>
        <div className="breadcrumbs">
            <div className="breadcrumbs-item" onClick={() => router.push("/")}>{busNo} Numaralı Otobüs</div>
            <div className="breadcrumbs-icon"><FaArrowRight size={12} /></div>
            <div className="breadcrumbs-item" onClick={() => router.push("/hat/" + busNo)}>Durak Seçiniz</div>
            <div className="breadcrumbs-icon"><FaArrowRight size={12} /></div>
            <div className="breadcrumbs-item">Yaklaşan Otobüsler</div>
        </div>
        </>
    )
}