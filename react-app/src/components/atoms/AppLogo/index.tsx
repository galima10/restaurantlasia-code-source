import styles from "./AppLogo.module.scss";

export default function AppLogo({
  link,
  src,
  className,
  type,
}: {
  link?: string;
  src?: string;
  className?: string;
  type: string;
}) {
  return (
    <a href={link} className={(className ?? "") + " " + styles.appLogo}>
      <img
        src={src || null}
        alt={type === "favicon" ? "Favicon de la marque" : "Logo de la marque"}
        loading="lazy"
      />
    </a>
  );
}
