import { useEffect, useState } from "react";

export const enum ScreenSize {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
  MOBILE = "mobile",
}
export function UseWindowSize() {
  const [size, setSize] = useState<{
    width: number;
    screenSize: ScreenSize;
  }>({
    width: 0,
    screenSize: ScreenSize.MEDIUM,
  });

  const checkScreenSize = (size: number) => {
    if (size > 1600) return { width: size, screenSize: ScreenSize.LARGE };
    if (size > 900) return { width: size, screenSize: ScreenSize.MEDIUM };
    if (size > 500) return { width: size, screenSize: ScreenSize.SMALL };
    return { width: size, screenSize: ScreenSize.MOBILE };
  };
  useEffect(() => {
    let throttleTimer: boolean;
    function updateSize() {
      console.log("updated.........................");
      if (window?.innerWidth !== size.width)
        setSize(checkScreenSize(window?.innerWidth));
    }
    const throttle = (callback: Function, time: number) => {
      if (throttleTimer) return;
      throttleTimer = true;
      setTimeout(() => {
        callback();
        throttleTimer = false;
      }, time);
    };
    window?.addEventListener("resize", () => {
      throttle(updateSize, 350);
    });
    throttle(updateSize, 350);
    return () => window?.removeEventListener("resize", updateSize);
    // eslint-disable-next-line
  }, []);
  return { ...size };
}
