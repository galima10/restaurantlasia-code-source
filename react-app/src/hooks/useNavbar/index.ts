import { useState, useEffect } from "react";

export function useNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Quand le menu est ouvert → bloque le scroll
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Nettoyage si le composant se démonte
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  return { isMenuOpen, setIsMenuOpen };
}
