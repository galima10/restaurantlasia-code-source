import styles from "./ComplexTripleImagesSection.module.scss";

interface ComplexTripleImagesSectionProps {
  datas?: {
    title?: string;
    hook?: string;
    images?: {
      img1?: {
        src?: string;
        alt?: string;
      };
      img2?: {
        src?: string;
        alt?: string;
      };
      img3?: {
        src?: string;
        alt?: string;
      };
    };
    description?: {
      paragraph1?: string;
      paragraph2?: string;
    };
  };
}

export default function ComplexTripleImagesSection({
  datas,
}: ComplexTripleImagesSectionProps) {
  return (
    <section className={styles.complexTripleImagesSection}>
      <h2>{datas?.title || "Titre de la section"}</h2>
      <ul>
        <li>
          <img
            src={datas?.images?.img1?.src || null}
            alt={datas?.images?.img1?.alt || "Image 1"}
            className="shadow"
            loading="lazy"
          />
        </li>
        <li>
          <img
            src={datas?.images?.img2?.src || null}
            alt={datas?.images?.img2?.alt || "Image 2"}
            className="shadow"
            loading="lazy"
          />
        </li>
        <li>
          <img
            src={datas?.images?.img3?.src || null}
            alt={datas?.images?.img3?.alt || "Image 3"}
            className="shadow"
            loading="lazy"
          />
        </li>
      </ul>
      <p className={styles.textHighlighted}>
        <strong>{datas?.hook || "Phrase d'accroche"}</strong>
      </p>
      <p>{datas?.description?.paragraph1 || "Description paragraphe 1"}</p>
      <p>{datas?.description?.paragraph2 || "Description paragraphe 2"}</p>
    </section>
  );
}
