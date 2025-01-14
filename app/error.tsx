"use client";

import { FaArrowRight } from "react-icons/fa";

export default function Error() {
    return (
        <div className="wrapper">
            <div className="error-wrapper">
                <p>Bir hata oluştu. 🙃</p>

                <a href="/">Anasayfaya dön <FaArrowRight size={16} /></a>
            </div>
        </div>
    )
}