import styles from "./HeaderSection.module.scss";

interface HeaderSectionProps {
  datas?: {
    title?: string;
    category?: string;
    imageHighlighted?: {
      src?: string;
      alt?: string;
    };
  };
}

export default function HeaderSection({ datas }: HeaderSectionProps) {
  return (
    <section className={styles.headerSection + " curve-bottom"}>
      <hgroup>
        <h1>{datas?.title || "Titre du produit"}</h1>
        <p>{datas?.category || "Catégorie du produit"}</p>
      </hgroup>
      <img
        src={datas?.imageHighlighted?.src || null}
        alt={datas?.imageHighlighted?.alt || "Image du produit"}
        className={styles.productImage}
        loading="lazy"
      />
    </section>
  );
}
