import styles from "./twoimagestextsection.module.scss";

import { useDynamicBackground } from "@hooks/useDynamicBackground";

import AppButton from "@components/atoms/AppButton";

interface TwoImagesTextSectionProps {
  datas?: {
    title?: string;
    images?: {
      img1?: {
        src?: string;
        alt?: string;
      };
      img2?: {
        src?: string;
        alt?: string;
      };
    };
    backgroundImage?: string;
    description?: {
      paragraph1?: string;
      paragraph2?: string;
    };
    buttonCTA?: {
      link?: string;
      text?: string;
    };
  };
}

export default function TwoImagesTextSection({
  datas,
}: TwoImagesTextSectionProps) {
  const { sectionRef } = useDynamicBackground(datas?.backgroundImage);
  return (
    <section
      ref={sectionRef}
      className={`${styles.twoImagesTextSection}`}
    >
      <h2>{datas?.title || "Titre de la section"}</h2>
      <img
        className="shadow"
        src={datas?.images?.img1?.src || null}
        alt={datas?.images?.img1?.alt || "Image 1"}
        loading="lazy"
      />
      <img
        className="shadow"
        src={datas?.images?.img2?.src || null}
        alt={datas?.images?.img2?.alt || "Image 2"}
        loading="lazy"
      />
      <div>
        <p>
          {datas?.description?.paragraph1 || <span>Description de la section 1</span>}
        </p>
        <p>
          {datas?.description?.paragraph2 || <span>Description de la section 2</span>}
        </p>
        <AppButton
          className={styles.cta}
          link={datas?.buttonCTA?.link || "/"}
          text={datas?.buttonCTA?.text || "Bouton CTA"}
          type="primary"
        />
      </div>
    </section>
  );
}
