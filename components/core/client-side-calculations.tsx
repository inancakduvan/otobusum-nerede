"use client";

import { useEffect, useLayoutEffect } from 'react';
import ReactGA from 'react-ga4';

export default function ClientSideCalculations() {
    useLayoutEffect(() => {
        const resizeOps = () => {
            document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
        };
  
        resizeOps();
        window.addEventListener("resize", resizeOps);
    }, [])

    useEffect(() => {
        if (process.env.GOOGLE_ANALYTICS_KEY) {
            ReactGA.initialize(process.env.GOOGLE_ANALYTICS_KEY);
        }
    }, [process.env.GOOGLE_ANALYTICS_KEY])

    return null;
};