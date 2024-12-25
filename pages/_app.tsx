import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import ReactGA from "react-ga4";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log("33333")
    ReactGA.initialize("G-DG2HKRMEHC");

  }, [])
  return <Component {...pageProps} />;
}
