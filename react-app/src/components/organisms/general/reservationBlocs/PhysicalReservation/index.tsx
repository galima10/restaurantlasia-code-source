import { useTransformGeneralInfos } from "@hooks/useTransformGeneralInfos";

export default function PhysicalReservation({
  className,
  physicalReservation,
  globalInfo,
}: {
  className?: string;
  physicalReservation?: {
    slogan?: string;
  };
  globalInfo?: {
    openingHours?: {
      noon?: {
        start: string;
        end: string;
      };
      evening?: {
        start: string;
        end: string;
      };
    };
    closedDays?: string[];
    phoneNumber?: string;
    address?: string;
  };
}) {
  const { openingDay } = useTransformGeneralInfos(
    globalInfo?.openingHours,
    globalInfo?.closedDays
  );

  return (
    <section className={className}>
      <hgroup>
        <h2 className="pink">Réserver par téléphone</h2>
        <p>{physicalReservation?.slogan || "Phrase d'accroche"}</p>
      </hgroup>
      <h3>Nos horaires</h3>
      <p>{openingDay || "Horaires non disponibles"}</p>
      <h3>Notre adresse</h3>
      <p>{globalInfo?.address || "Adresse non disponible"}</p>
      <h3>Notre numéro</h3>
      <p>{globalInfo?.phoneNumber || "Numéro non disponible"}</p>
    </section>
  );
}
