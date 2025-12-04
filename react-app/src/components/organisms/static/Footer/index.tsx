import styles from "./Footer.module.scss";

import { useTransformGeneralInfos } from "@hooks/useTransformGeneralInfos";

import BulletList from "@components/molecules/BulletList";
import AppButton from "@components/atoms/AppButton";

interface FooterProps {
  datas?: {
    logo?: {
      src?: string;
      alt?: string;
    };

    buttonCTA?: {
      link?: string;
      text?: string;
    };
    navLinks?: {
      [key: string]: { link?: string; text?: string };
    };
    productSectionLinks?: {
      [key: string]: { link?: string; text?: string };
    };
    productsTitlePage?: string;
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
      instagram?: {
        link?: string;
        account?: string;
      };
    };
  };
}

export default function Footer({
  datas = {
    logo: { src: null, alt: null },
    buttonCTA: { link: null, text: null },
    navLinks: {
      link1: { link: null, text: null },
    },
    productSectionLinks: null,
    productsTitlePage: null,
    globalInfo: {
      openingHours: null,
      closedDays: null,
      phoneNumber: null,
      address: null,
      instagram: { link: null, account: null },
    },
  },
}: FooterProps) {
  const { openingDay } = useTransformGeneralInfos(
    datas?.globalInfo?.openingHours,
    datas?.globalInfo?.closedDays
  );
  return (
    <div className={styles.footer}>
      <div className={styles.sectionInfos}>
        <img
          src={datas?.logo?.src || null}
          alt={datas?.logo?.alt || "Logo"}
          className={styles.logo}
          loading="lazy"
        />
        <BulletList className={styles.contactInfo}>
          <li>
            <p>{openingDay || "Aucune information d'ouverture disponible"}</p>
          </li>
          <li>
            <p>{datas?.globalInfo?.address || "Aucune adresse disponible"}</p>
          </li>
          <li>
            <p>
              {datas?.globalInfo?.phoneNumber ||
                "Aucun numéro de téléphone disponible"}
            </p>
          </li>
        </BulletList>
        <a
          href={datas?.globalInfo?.instagram?.link || "/"}
          className={styles.socialMedia}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.975 5.8H19.99M7 25H19C22.3137 25 25 22.3137 25 19V7C25 3.68629 22.3137 1 19 1H7C3.68629 1 1 3.68629 1 7V19C1 22.3137 3.68629 25 7 25ZM18.625 13C18.625 16.1066 16.1066 18.625 13 18.625C9.8934 18.625 7.375 16.1066 7.375 13C7.375 9.8934 9.8934 7.375 13 7.375C16.1066 7.375 18.625 9.8934 18.625 13Z"
              stroke="#7C1A3B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {datas?.globalInfo?.instagram?.account || "nomducompte"}
        </a>
        {datas?.buttonCTA?.link && datas?.buttonCTA?.text && (
          <AppButton
            className={styles.cta}
            link={datas?.buttonCTA?.link || "/"}
            text={datas?.buttonCTA?.text || "Bouton CTA"}
            type="primary"
          />
        )}
      </div>
      <div>
        <p className={styles.sectionTitle}>Contenu du site</p>
        <ul>
          {datas?.navLinks &&
            Object.entries(datas?.navLinks).map(
              ([key, value]: [string, { link?: string; text?: string }]) => (
                <li key={`nav-link-${key}`}>
                  <AppButton
                    link={value.link}
                    text={value.text || "Accueil"}
                    type="menu"
                  />
                </li>
              )
            )}
        </ul>
      </div>
      <div>
        {datas?.productSectionLinks && (
          <>
            <p className={styles.sectionTitle}>{datas?.productsTitlePage}</p>
            <ul>
              {datas?.productSectionLinks &&
                Object.entries(datas?.productSectionLinks).map(
                  ([key, value]: [
                    string,
                    { link?: string; text?: string }
                  ]) => (
                    <li key={`nav-link-${key}`}>
                      <AppButton
                        link={value.link}
                        text={value.text}
                        type="menu"
                      />
                    </li>
                  )
                )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
