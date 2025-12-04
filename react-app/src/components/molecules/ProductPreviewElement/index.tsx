import styles from "./ProductPreviewElement.module.scss";
export default function ProductPreviewElement({
  name,
  src,
  alt,
  link,

}: {
  name?: string;
  src?: string;
  alt?: string;
  link?: string;
}) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <figure className={styles.productPreviewElement}>
        <img src={src || null} alt={alt || "Image produit"} className="shadow" loading="lazy" />
        <figcaption className={styles.figcaption}>
          <p className={styles.name}>{name || "Produit"}</p>
          <p className={styles.moreInfo}>En savoir plus</p>
        </figcaption>
      </figure>
    </a>
  );
}
