import styles from "./FlagShipProductsModuleSection.module.scss";

import FlagShipPreview from "@components/molecules/FlagShipPreview";
import AppButton from "@components/atoms/AppButton";

import { useDynamicBackground } from "@hooks/useDynamicBackground";

interface MenuSectionProps {
  datas?: {
    backgroundImage?: string;
    image?: {
      src?: string;
      alt?: string;
    };
    flagshipDishes?: {
      name?: string;
      src?: string;
      link?: string;
    }[];
    title?: string;
    hook?: string;
    buttonCTA?: {
      link?: string;
      text?: string;
    };
  };
}

export default function FlagShipProductsModuleSection({
  datas = {
    backgroundImage: null,
    image: {
      src: null,
      alt: null,
    },
    flagshipDishes: [],
    title: null,
    hook: null,
    buttonCTA: {
      link: null,
      text: null,
    },
  },
}: MenuSectionProps) {
  const { sectionRef } = useDynamicBackground(datas?.backgroundImage);
  return (
    <section className={styles.flagShipProductsModuleSection} ref={sectionRef}>
      <hgroup>
        <h2 className="pink">{datas?.title || "Titre de la section"}</h2>
        <p>{datas?.hook || "Phrase d'accroche pour la section"}</p>
        <AppButton
          className={styles.cta}
          link={datas?.buttonCTA?.link || "/"}
          text={datas?.buttonCTA?.text || "Bouton CTA"}
          type="primary"
        />
      </hgroup>
      <div className={`${styles.flagshipDishes} shadow`}>
        <FlagShipPreview
          link={datas?.flagshipDishes?.[0]?.link || "/"}
          src={datas?.flagshipDishes?.[0]?.src || null}
          name={datas?.flagshipDishes?.[0]?.name || "Produit 1"}
        />
        <FlagShipPreview
          link={datas?.flagshipDishes?.[1]?.link || "/"}
          src={datas?.flagshipDishes?.[1]?.src || null}
          name={datas?.flagshipDishes?.[1]?.name || "Produit 2"}
        />
        <FlagShipPreview
          link={datas?.flagshipDishes?.[2]?.link || "/"}
          src={datas?.flagshipDishes?.[2]?.src || null}
          name={datas?.flagshipDishes?.[2]?.name || "Produit 3"}
        />
        <img
          className={styles.imageDecoration}
          src={datas?.image?.src || null}
          alt={datas?.image?.alt || "Image d'illustration"}
          loading="lazy"
        />
      </div>
    </section>
  );
}
