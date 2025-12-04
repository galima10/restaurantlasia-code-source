import styles from "./HeaderPageContainer.module.scss";

interface HeaderPageContainerProps {
  datas?: {
    title?: string;
    image?: {
      src?: string;
      alt?: string;
    };
  };
}

export default function HeaderPageContainer({ datas }: HeaderPageContainerProps) {
  return (
    <div className={styles.headerPageContainer}>
      <div className={styles.banner}>
        <img
          src={datas?.image?.src || null}
          alt={datas?.image?.alt || "Bannière imagée"}
          loading="lazy"
        />
      </div>
      <div className={styles.titlePage}>
        <h1>{datas?.title || "Titre de la page"}</h1>
      </div>
    </div>
  );
}
