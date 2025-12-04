import { useDynamicBackground } from "@hooks/useDynamicBackground";

export default function ReservationIntroduction({
  className,
  introduction,
  backgroundImage,
}: {
  className?: string;
  introduction?: {
    title?: string;
    description?: string;
  };
  backgroundImage?: string;
}) {
  const { sectionRef } = useDynamicBackground(backgroundImage);
  return (
    <section ref={sectionRef} className={className}>
      <h2 className="pink">{introduction?.title || "Titre CTA Réservation"}</h2>
      <p>
        {introduction?.description ||
          "Description de la section de réservation"}
      </p>
    </section>
  );
}
