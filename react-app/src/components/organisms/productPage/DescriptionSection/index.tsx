import styles from "./DescriptionSection.module.scss";

interface DescriptionSectionProps {
  datas?: {
    description?: string;
    imageHighlighted?: {
      src?: string;
      alt?: string;
    };
    price?: number;
  };
}

export default function DescriptionSection({ datas }: DescriptionSectionProps) {
  return (
    <section className={styles.descriptionSection}>
      <h2>Description</h2>
      <p className={styles.description}>
        {datas?.description || "Description du produit"}
      </p>
      <p className={styles.price}>
        Prix: {datas?.price ? Number(datas.price).toFixed(2) : "0.00"} €
      </p>
      <div className={styles.images + " shadow"}>
        <img
          src={datas?.imageHighlighted?.src || null}
          alt={datas?.imageHighlighted?.alt || "Image produit"}
          loading="lazy"
        />
        <img
          src={datas?.imageHighlighted?.src || null}
          alt={datas?.imageHighlighted?.alt || "Image produit"}
          loading="lazy"
        />
        <img
          src={datas?.imageHighlighted?.src || null}
          alt={datas?.imageHighlighted?.alt || "Image produit"}
          loading="lazy"
        />
      </div>
    </section>
  );
}
