import { useEffect, useState } from "react";

import styles from './style.module.scss';
import { MdInstallMobile, MdClose } from "react-icons/md";
import { useBusLinesContext } from "@/context/bus-lines";

function isIos() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

function isInStandaloneMode() {
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

   const { setIsShowIosModal } = useBusLinesContext();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };
    
    if (isIos() && !isInStandaloneMode()) {
        setShowButton(true);
    }

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIos() && !isInStandaloneMode()) {
        setIsShowIosModal(true);
    } else {
        console.log(deferredPrompt)
        if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
           
            if (outcome === "accepted") {
                console.log("Kullanıcı uygulamayı yükledi");
            } else {
                console.log("Kullanıcı yüklemeyi reddetti");
           
            }
            setDeferredPrompt(null);
            setShowButton(false);
        }
  };

  if (showButton && !isInStandaloneMode()) {
    return (
    <>
      <button onClick={handleInstallClick} className={styles.installButton}>
        <MdInstallMobile />
      </button>
    </>
    );
  }

  return null;
}