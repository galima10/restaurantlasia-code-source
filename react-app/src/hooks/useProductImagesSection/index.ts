import { useState, useRef, useEffect } from "react";
import styles from "@components/organisms/productPage/ProductImagesSection/ProductImagesSection.module.scss";

export function useProductImagesSection(images: string[]) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(true); // Par défaut, le useEffect est actif

  const carrouselRef = useRef<HTMLUListElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  function getRotationAngle(transform: string): number {
    const matrix = transform.match(/matrix\(([^)]+)\)/);
    if (matrix) {
      const values = matrix[1].split(", ");
      const a = parseFloat(values[0]); // Valeur "a" de la matrice
      const b = parseFloat(values[1]); // Valeur "b" de la matrice
      const angle = Math.atan2(b, a) * (180 / Math.PI); // Calcul de l'angle en degrés
      return angle;
    }
    return 0; // Si aucune transformation n'est appliquée, l'angle est 0
  }

  function normalizeAngle(angle: number): number {
    return ((angle % 360) - 360) % 360; // Assure que l'angle reste dans [0, 360]
  }

  function handleNavImage(direction: "next" | "prev") {
    if (carrouselRef.current && !isAnimating) {
      const carrousel = carrouselRef.current;
      const currentTransform = getComputedStyle(carrousel).transform;
      const currentRotation = getRotationAngle(currentTransform); // Récupère l'angle actuel
      let newRotation: number;

      if (direction === "prev") {
        if (currentImageIndex > 0) {
          newRotation = normalizeAngle(currentRotation + 45); // Ajoute 45° et normalise
          setCurrentImageIndex((prevIndex) => prevIndex - 1);
        }
      } else if (direction === "next") {
        if (currentImageIndex < images.length - 1) {
          newRotation = normalizeAngle(currentRotation - 45); // Soustrait 45° et normalise
          setCurrentImageIndex((prevIndex) => prevIndex + 1);
        }
      }

      if (newRotation !== undefined) {
        setIsAnimating(true); // Bloque les clics pendant l'animation
        carrousel.style.transform = `rotate(${newRotation}deg)`;

        // Attendre la fin de la transition avant de réactiver les clics
        carrousel.addEventListener(
          "transitionend",
          () => {
            setIsAnimating(false); // Réactive les clics
          },
          { once: true } // L'événement est écouté une seule fois
        );
      }
    }
  }

  function updateButtonStyles() {
    buttonsRef.current.forEach((button, index) => {
      if (button) {
        if (index === currentImageIndex) {
          button.classList.add(styles.activeButton); // Ajoute une classe pour le bouton actif
        } else {
          button.classList.remove(styles.activeButton); // Supprime la classe des autres boutons
        }
      }
    });
  }

  function handleNavButtonClick(index: number) {
    if (index !== currentImageIndex && !isAnimating) {
      const carrousel = carrouselRef.current;
      if (carrousel) {
        // Désactive temporairement le useEffect
        setIsUpdating(false);

        // Affiche temporairement toutes les images avec les conditions
        carrousel.childNodes.forEach((node, idx) => {
          const element = node as HTMLElement;

          // Condition pour empêcher la dernière image de s'afficher si index === 0
          if (index === 0 && idx === images.length - 1 && images.length > 5) {
            element.style.display = "none";
          }
          // Condition pour empêcher la première image de s'afficher si index === dernier
          else if (
            index === images.length - 1 &&
            idx === 0 &&
            images.length > 5
          ) {
            element.style.display = "none";
          } else {
            element.style.display = "block"; // Affiche les autres éléments
          }
        });

        const currentTransform = getComputedStyle(carrousel).transform;
        const currentRotation = getRotationAngle(currentTransform);
        const newRotation = normalizeAngle(
          currentRotation - 45 * (index - currentImageIndex)
        );

        setCurrentImageIndex(index);

        setIsAnimating(true);
        carrousel.style.transform = `rotate(${newRotation}deg)`;

        carrousel.addEventListener(
          "transitionend",
          () => {
            setIsAnimating(false);

            // Restaure l'état initial des images après l'animation
            carrousel.childNodes.forEach((node, idx) => {
              const element = node as HTMLElement;

              // Condition pour empêcher la dernière image de s'afficher si index === 0
              if (index === 0 && idx === images.length - 1) {
                element.style.display = "none";
              }
              // Condition pour empêcher la première image de s'afficher si index === dernier
              else if (index === images.length - 1 && idx === 0) {
                element.style.display = "none";
              }
              // Affiche les éléments nécessaires
              else if (
                idx === index || // Élément actuel
                idx === index - 2 ||
                idx === index - 1 ||
                idx === index + 1 ||
                idx === index + 2
              ) {
                element.style.display = "block";
              } else {
                element.style.display = "none";
              }
            });

            // Réactive le useEffect
            setIsUpdating(true);
          },
          { once: true } // L'événement est écouté une seule fois
        );
      }
    }
  }

  useEffect(() => {
    updateButtonStyles();
  }, [currentImageIndex]);

  useEffect(() => {
    if (!isUpdating) return; // Bloque l'exécution si isUpdating est false

    carrouselRef.current?.childNodes.forEach((node, index) => {
      const element = node as HTMLElement;
      if (
        index === currentImageIndex || // Élément actuel
        index === currentImageIndex - 2 ||
        index === currentImageIndex - 1 ||
        index === currentImageIndex + 1 ||
        index === currentImageIndex + 2
      ) {
        element.style.display = "block"; // Affiche ces éléments
      } else {
        element.style.display = "none"; // Cache les autres
      }
    });
  }, [currentImageIndex, isUpdating]);

  return {
    carrouselRef,
    buttonsRef,
    handleNavImage,
    handleNavButtonClick,
    currentImageIndex,
    isAnimating,
  };
}
