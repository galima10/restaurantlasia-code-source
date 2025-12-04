import styles from "./NavigationSection.module.scss";

import AppButton from "@components/atoms/AppButton";

interface NavigationSectionProps {
  datas?: {
    previousProductLink?: string;
    nextProductLink?: string;
    productsListLink?: string;
  };
}

export default function NavigationSection({ datas }: NavigationSectionProps) {
  return (
    <ul className={styles.navigationSection}>
      <li>
        <AppButton
          link={datas?.previousProductLink || "#"}
          text="Produit précédent"
          type="secondary"
          className={datas?.previousProductLink ? "" : styles.disabled}
        />
      </li>
      <li>
        <AppButton
          link={datas?.nextProductLink || "#"}
          text="Produit suivant"
          type="secondary"
          className={datas?.nextProductLink ? "" : styles.disabled}
        />
      </li>
      <li>
        <AppButton
          link={datas?.productsListLink || "#"}
          text="Retour à la liste des produits"
          type="tertiary"
          className={datas?.productsListLink ? "" : styles.disabled}
        />
      </li>
    </ul>
  );
}
