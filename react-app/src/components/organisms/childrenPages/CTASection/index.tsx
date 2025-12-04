import styles from "./CTASection.module.scss";

import AppButton from "@components/atoms/AppButton";

interface CTASectionProps {
  datas?: {
    title?: string;
    description?: string;
    buttonCTA?: {
      text?: string;
      link?: string;
    };
    images?: {
      img1?: { src?: string; alt?: string };
      img2?: { src?: string; alt?: string };
      img3?: { src?: string; alt?: string };
    };
  };
}

export default function CTASection({ datas }: CTASectionProps) {
  return (
    <section className={styles.ctaSection}>
      <h2>{datas?.title || "Titre de la section"}</h2>
      <div className={styles.images + " shadow"}>
        <img
          src={datas?.images?.img3?.src || null}
          alt={datas?.images?.img3?.alt || "Image 1"}
          loading="lazy"
        />
        <img
          src={datas?.images?.img2?.src || null}
          alt={datas?.images?.img2?.alt || "Image 2"}
          loading="lazy"
        />
        <img
          src={datas?.images?.img1?.src || null}
          alt={datas?.images?.img1?.alt || "Image 3"}
          loading="lazy"
        />
      </div>
      <p>
        {datas?.description ||
          "Description de la section incitant l'utilisateur à cliquer sur le bouton pour effectuer une action spécifique."}
      </p>
      <AppButton
        className={styles.cta}
        link={datas?.buttonCTA?.link || "/"}
        text={datas?.buttonCTA?.text || "Bouton CTA"}
        type="primary"
      />
    </section>
  );
}
