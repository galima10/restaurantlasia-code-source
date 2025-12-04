import styles from "./ComplexFourImagesSection.module.scss";

import { useDynamicBackground } from "@hooks/useDynamicBackground";

interface ComplexFourImagesSectionProps {
  datas?: {
    title?: string;
    description?: {
      paragraph1?: string;
      paragraph2?: string;
    };
    images?: {
      img1?: { src?: string; alt?: string };
      img2?: { src?: string; alt?: string };
      img3?: { src?: string; alt?: string };
      img4?: { src?: string; alt?: string };
    };
    backgroundImage?: string;
  };
}

export default function ComplexFourImagesSection({
  datas,
}: ComplexFourImagesSectionProps) {
  const { sectionRef } = useDynamicBackground(datas?.backgroundImage);
  return (
    <section ref={sectionRef} className={styles.complexFourImagesSection}>
      <h2 className="pink">{datas?.title || "Titre de la section"}</h2>
      <p>{datas?.description?.paragraph1 || "Description paragraphe 1"}</p>
      <p>{datas?.description?.paragraph2 || "Description paragraphe 2"}</p>
      <img
        src={datas?.images?.img1?.src || null}
        alt={datas?.images?.img1?.alt || "Image 1"}
        className="shadow"
        loading="lazy"
      />
      <img
        src={datas?.images?.img2?.src || null}
        alt={datas?.images?.img2?.alt || "Image 2"}
        className="shadow"
        loading="lazy"
      />
      <img
        src={datas?.images?.img3?.src || null}
        alt={datas?.images?.img3?.alt || "Image 3"}
        className="shadow"
        loading="lazy"
      />
      <img
        src={datas?.images?.img4?.src || null}
        alt={datas?.images?.img4?.alt || "Image 4"}
        className="shadow"
        loading="lazy"
      />
    </section>
  );
}
