import { useState, useEffect } from "react";

export const useDeviceDetect = (width: number = 960) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < width);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < width);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};
