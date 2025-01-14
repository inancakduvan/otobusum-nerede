"use client";

import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function GoogleAnalytics() {
    useEffect(() => {
        if (process.env.GOOGLE_ANALYTICS_KEY) {
            ReactGA.initialize(process.env.GOOGLE_ANALYTICS_KEY);
        }
    }, [process.env.GOOGLE_ANALYTICS_KEY])

    return null;
};