import styles from "./SimpleTextButtonSection.module.scss";

import AppButton from "@components/atoms/AppButton";

interface SimpleTextButtonSectionProps {
  datas?: {
    text?: string;
    buttonCTA?: {
      text?: string;
      link?: string;
    };
  };
}

export default function SimpleTextButtonSection({
  datas,
}: SimpleTextButtonSectionProps) {
  return (
    <div className={styles.simpleTextButtonSection}>
      <p>
        {datas?.text || "Paragraphe par défaut"}
      </p>
      <AppButton
        className={styles.cta}
        link={datas?.buttonCTA?.link || "/"}
        text={datas?.buttonCTA?.text || "Bouton CTA"}
        type="primary"
      />
    </div>
  );
}
