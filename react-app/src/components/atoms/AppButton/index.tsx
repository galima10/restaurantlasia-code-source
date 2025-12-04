export default function AppButton({
  link,
  text,
  type,
  className,
  blank,
}: {
  link?: string;
  text: string;
  type: string;
  className?: string;
  blank?: boolean;
}) {
  return (
    <a
      href={link ?? "#"}
      className={`${type}-button ${className ?? ""}`}
      target={blank ? "_blank" : undefined}
      rel={blank ? "noopener noreferrer" : undefined}
    >
      {text}
    </a>
  );
}
