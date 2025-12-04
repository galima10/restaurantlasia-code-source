import styles from "./SimpleImageTextSection.module.scss";

import BulletList from "@components/molecules/BulletList";

import { useDynamicBackground } from "@hooks/useDynamicBackground";

interface SimpleImageTextSectionProps {
  datas?: {
    title?: string;
    image?: {
      src?: string;
      alt?: string;
    };
    backgroundImage?: string;
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
  };
}

export default function SimpleImageTextSection({
  datas = {
    title: "",
    image: { src: "", alt: "" },
    backgroundImage: "",
    globalInfo: {
      openingHours: {
        noon: { start: "", end: "" },
        evening: { start: "", end: "" },
      },
      closedDays: [],
      phoneNumber: "",
      address: "",
    },
  },
}: SimpleImageTextSectionProps) {
  const { sectionRef } = useDynamicBackground(datas?.backgroundImage);
  const displayDays = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];
  const openingHours = datas?.globalInfo?.openingHours;

  const noonHours =
    openingHours.noon?.start !== "00:00" && openingHours.noon?.end !== "00:00"
      ? `${openingHours.noon.start}-${openingHours.noon.end}`
      : null;
  const eveningHours =
    openingHours.evening?.start !== "00:00" &&
    openingHours.evening?.end !== "00:00"
      ? `${openingHours.evening.start}-${openingHours.evening.end}`
      : null;

  return (
    <section className={styles.simpleImageTextSection} ref={sectionRef}>
      <h2>{datas?.title || "Titre de la section"}</h2>
      <img
        className="shadow"
        src={datas?.image?.src || null}
        alt={datas?.image?.alt || "Image"}
        loading="lazy"
      />
      <section className={styles.informationDetails}>
        <h3>Nos horaires</h3>
        <BulletList>
          <li>
            <p>{datas?.globalInfo?.address}</p>
          </li>
          <li>
            <p>{datas?.globalInfo?.phoneNumber}</p>
          </li>
        </BulletList>
        <ul>
          {displayDays.map((day) => (
            <li key={day}>
              <p>
                {day.slice(0, 1).toUpperCase() + day.slice(1)} —{" "}
                {datas?.globalInfo?.closedDays.includes(day)
                  ? "Fermé"
                  : `${noonHours ? noonHours : ""}${
                      noonHours && eveningHours ? " & " : ""
                    }${eveningHours ? eveningHours : ""}`}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
