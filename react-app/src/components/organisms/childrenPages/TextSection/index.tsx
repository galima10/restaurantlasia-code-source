import styles from "./TextSection.module.scss";

interface TextSectionProps {
  datas?: {
    text?: string;
  };
}

export default function TextSection({ datas }: TextSectionProps) {
  return (
    <div className={styles.textSection}>
      <p>
        {datas?.text || <p>Paragraphe par défaut</p>}
      </p>
    </div>
  );
}
