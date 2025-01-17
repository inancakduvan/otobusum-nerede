"use client";

import ProgressBar from "../core/progress-bar";
import Header from "./header";
import Stations from "./stations";

export default function BusStations() {
    return (
        <div className="wrapper">
            <ProgressBar top="85px" />
            <Header />
            <Stations />
        </div>
    )
}