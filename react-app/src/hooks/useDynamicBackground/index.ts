import { useEffect, useRef, RefObject } from "react";

import fallbackImg from "@assets/images/fallback.webp";

export function useDynamicBackground<T extends HTMLElement = HTMLElement>(
  backgroundImageSrc?: string
): { sectionRef: RefObject<T> } {
  const sectionRef = useRef<T>(null); // Utilisation du type générique T

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Définir dynamiquement la source de l'image de fond
    section.style.setProperty(
      "--background-image",
      `url(${String(backgroundImageSrc || fallbackImg)})`
    );
  }, [backgroundImageSrc]);

  return { sectionRef };
}