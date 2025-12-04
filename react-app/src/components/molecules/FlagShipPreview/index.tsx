import styles from "./FlagShipPreview.module.scss";
import AppButton from "@components/atoms/AppButton";

export default function FlagShipPreview({
  link,
  src,
  name,
}: {
  link: string;
  src: string;
  name: string;
}) {
  return (
    <div>
      <a href={link} className={styles.dishLink}>
        <p className={styles.name}>{name}</p>
        <p className={styles.viewMore}>Voir plus</p>
      </a>
      <img src={src} alt={name} loading="lazy" />
    </div>
  );
}
