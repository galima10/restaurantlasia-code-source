import styles from "./FrontPageHero.module.scss";

import AppButton from "@components/atoms/AppButton";
import BulletList from "@components/molecules/BulletList";

import { useDynamicBackground } from "@hooks/useDynamicBackground";
import { useTransformGeneralInfos } from "@hooks/useTransformGeneralInfos";

interface FrontPageHeroProps {
  datas?: {
    backgroundImage?: string;
    images?: {
      image1?: {
        src?: string;
        alt?: string;
      };
      imageProduct?: {
        src?: string;
        alt?: string;
      };
    };
    title?: string;
    buttonCTA?: {
      link?: string;
      text?: string;
    };
    buttonSecondaryCTA?: {
      link?: string;
      text?: string;
    };
    hook?: string;
    globalInfo?: {
      openingHours?: {
        noon?: {
          start: string;
          end: string;
        };
        evening?: {
          start: string;
          end: string;
        };
      };
      closedDays?: string[];
      phoneNumber?: string;
      address?: string;
    };
  };
}

export default function FrontPageHero({
  datas = {
    backgroundImage: null,
    images: {
      image1: { src: null, alt: null },
      imageProduct: { src: null, alt: null },
    },
    title: null,
    buttonCTA: { link: null, text: null },
    buttonSecondaryCTA: { link: null, text: null },
    globalInfo: {
      openingHours: {
        noon: { start: null, end: null },
        evening: { start: null, end: null },
      },
      phoneNumber: null,
      address: null,
    },
    hook: null,
  },
}: FrontPageHeroProps) {
  const { sectionRef } = useDynamicBackground(datas?.backgroundImage);
  const { openingDay } = useTransformGeneralInfos(
    datas.globalInfo?.openingHours,
    datas.globalInfo?.closedDays
  );

  return (
    <section ref={sectionRef} className={`curve-bottom ${styles.hero}`}>
      <h1>{datas.title || "Titre de la page"}</h1>
      <AppButton
        className={styles.cta}
        link={datas?.buttonCTA?.link || "/"}
        text={datas?.buttonCTA?.text || "Bouton CTA"}
        type="primary"
      />
      <BulletList>
        <li>
          <p>{openingDay || "Horaires non disponibles"}</p>
        </li>
        <li>
          <p>{datas?.globalInfo?.address || "Adresse non disponible"}</p>
        </li>
        <li>
          <p>{datas?.globalInfo?.phoneNumber || "Numéro non disponible"}</p>
        </li>
      </BulletList>
      <img
        className={`${styles.restaurantImage} shadow`}
        src={datas?.images?.image1?.src || null}
        alt={datas?.images?.image1?.alt || "Image"}
        loading="lazy"
      />
      <div className={styles.productHighlight}>
        <img
          className={`${styles.productImage} shadow`}
          src={datas?.images?.imageProduct?.src || null}
          alt={datas?.images?.imageProduct?.alt || "Image produit mis en avant"}
          loading="lazy"
        />
        <div>
          <p>
            <strong>{datas.hook || "Phrase d'accroche"}</strong>
          </p>
          <AppButton
            className={styles.button}
            link={datas?.buttonSecondaryCTA?.link || "/"}
            text={datas?.buttonSecondaryCTA?.text || "Bouton secondaire"}
            type="secondary"
          />
        </div>
      </div>
    </section>
  );
}
