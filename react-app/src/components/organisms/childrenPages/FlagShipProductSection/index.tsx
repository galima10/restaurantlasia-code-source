import styles from "./FlagShipProductSection.module.scss";

import AppButton from "@components/atoms/AppButton";

import { useDynamicBackground } from "@hooks/useDynamicBackground";

interface FlagShipProductSectionProps {
  datas?: {
    title?: string;
    description?: string;
    buttonCTA?: {
      text?: string;
      link?: string;
    };
    imageProduct?: {
      src?: string;
      alt?: string;
    };
    backgroundImage?: string;
  };
}

export default function FlagShipProductSection({
  datas = {
    title: null,
    description: null,
    buttonCTA: {
      text: null,
      link: null,
    },
    imageProduct: {
      src: null,
      alt: null,
    },
    backgroundImage: null,
  },
}: FlagShipProductSectionProps) {
  const { sectionRef } = useDynamicBackground(datas?.backgroundImage);
  return (
    <section ref={sectionRef} className={styles.flagShipProductSection}>
      <h2 className="pink">{datas?.title || "Titre de la section"}</h2>
      <p>{datas?.description || "Description de la section"}</p>
      <AppButton
        className={styles.cta}
        link={datas?.buttonCTA?.link || "/"}
        text={datas?.buttonCTA?.text || "Bouton CTA"}
        type="primary"
      />
      <img
        src={datas?.imageProduct?.src || null}
        alt={datas?.imageProduct?.alt || "Image du produit"}
        className="shadow"
        loading="lazy"
      />
    </section>
  );
}
