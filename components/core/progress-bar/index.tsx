"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./style.module.scss";

export default function ProgressBar() {
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setProgress(10);

      const timer = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      return timer;
    };

    const handleStop = (timer: NodeJS.Timeout) => {
      setProgress(100);
      clearInterval(timer);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    };

    const handleRouteChange = (href: string) => {
      const timer = handleStart();
      setTimeout(() => {
        handleStop(timer);
      }, 1000);
    };

    router.push = new Proxy(router.push, {
      apply(target, thisArg, args: [string, any?]) {
        handleRouteChange(args[0]);
        return target.apply(thisArg, args);
      },
    });
  }, [router]);

  if (!loading) return null;

  return (
    <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
  );
};