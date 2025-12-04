import styles from "./ProductImagesSection.module.scss";

import { useProductImagesSection } from "@hooks/useProductImagesSection";
import { useDynamicBackground } from "@hooks/useDynamicBackground";

interface ProductImagesSectionProps {
  datas?: {
    images?: { src: string; alt: string }[];
    backgroundImage?: string;
  };
}

export default function ProductImagesSection({
  datas,
}: ProductImagesSectionProps) {
  const {
    carrouselRef,
    buttonsRef,
    handleNavImage,
    handleNavButtonClick,
    currentImageIndex,
    isAnimating,
  } = useProductImagesSection(datas?.images?.map(image => image.src) || ["", "", ""]);
  const { sectionRef } = useDynamicBackground<HTMLDivElement>(
    datas?.backgroundImage
  );

  return (
    <div className={styles.productImagesSection} ref={sectionRef} aria-label="Carrousel des images du produit">
      <div className={styles.carrouselWrapper}>
        <div className={styles.carrousel}>
          <div className={styles.imagesContainer}>
            <ul className={styles.imageList} ref={carrouselRef}>
              {datas?.images?.map((image, index) => (
                <li key={index} className="shadow">
                  <img src={image.src} alt={image.alt || `Product image ${index + 1}`} loading="lazy" />
                </li>
              )) || (
                <>
                  <li className="shadow">
                    <img src={null} alt="Image 1" loading="lazy" />
                  </li>
                  <li className="shadow">
                    <img src={null} alt="Image 2" loading="lazy" />
                  </li>
                  <li className="shadow">
                    <img src={null} alt="Image 3" loading="lazy" />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className={styles.carrouselButtons}>
          <button
            className={`${styles.prevButton} ${styles.navButton}`}
            onClick={() => handleNavImage("prev")}
            disabled={currentImageIndex === 0 || isAnimating}
          >
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.18934 9.98524C4.60355 10.571 4.60355 11.5208 5.18934 12.1066L14.7353 21.6525C15.3211 22.2383 16.2708 22.2383 16.8566 21.6525C17.4424 21.0667 17.4424 20.117 16.8566 19.5312L8.37132 11.0459L16.8566 2.56062C17.4424 1.97483 17.4424 1.02508 16.8566 0.439297C16.2708 -0.14649 15.3211 -0.14649 14.7353 0.439297L5.18934 9.98524ZM7.25 11.0459V9.5459H6.25V11.0459V12.5459H7.25V11.0459Z" />
            </svg>
          </button>
          <ul>
            {datas?.images?.map((image, index) => (
              <li
                key={index}
                className="shadow"
                onClick={() => handleNavButtonClick(index)}
              >
                <button
                  ref={(el) => {
                    buttonsRef.current[index] = el; // Assigner l'élément au tableau
                  }}
                ></button>
              </li>
            )) || (
              <>
                <li className="shadow" onClick={() => handleNavButtonClick(0)}>
                  <button
                    ref={(el) => {
                      buttonsRef.current[0] = el; // Assigner l'élément au tableau
                    }}
                  ></button>
                </li>
                <li className="shadow" onClick={() => handleNavButtonClick(1)}>
                  <button
                    ref={(el) => {
                      buttonsRef.current[1] = el; // Assigner l'élément au tableau
                    }}
                  ></button>
                </li>
                <li className="shadow" onClick={() => handleNavButtonClick(2)}>
                  <button
                    ref={(el) => {
                      buttonsRef.current[2] = el; // Assigner l'élément au tableau
                    }}
                  ></button>
                </li>
              </>
            )}
          </ul>
          <button
            className={`${styles.nextButton} ${styles.navButton}`}
            onClick={() => handleNavImage("next")}
            disabled={
              currentImageIndex === (datas?.images?.length || 0) - 1 ||
              isAnimating
            }
          >
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8107 9.98524C17.3964 10.571 17.3964 11.5208 16.8107 12.1066L7.26472 21.6525C6.67893 22.2383 5.72918 22.2383 5.1434 21.6525C4.55761 21.0667 4.55761 20.117 5.1434 19.5312L13.6287 11.0459L5.1434 2.56062C4.55761 1.97483 4.55761 1.02508 5.1434 0.439297C5.72918 -0.14649 6.67893 -0.14649 7.26472 0.439297L16.8107 9.98524ZM14.75 11.0459V9.5459H15.75V11.0459V12.5459H14.75V11.0459Z"
                fill="#7C1A3B"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
