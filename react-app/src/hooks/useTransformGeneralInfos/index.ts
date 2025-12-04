import { useState, useEffect } from "react";

// Fonction utilitaire pour générer une plage horaire
function generateTimeSlots(start: string, end: string): string[] | null {
  if (!start || !end) return null; // Vérification des valeurs

  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  // Vérification si l'heure de début est inférieure à l'heure de fin
  if (
    startHour > endHour ||
    (startHour === endHour && startMinute >= endMinute)
  ) {
    console.error("L'heure de début doit être inférieure à l'heure de fin.");
    return null;
  }

  const slots: string[] = [];
  let currentHour = startHour;
  let currentMinute = startMinute;

  // On s'arrête 45 minutes avant l'heure de fermeture
  const endTime = new Date();
  endTime.setHours(endHour, endMinute - 45);

  while (true) {
    const currentTime = new Date();
    currentTime.setHours(currentHour, currentMinute);

    if (currentTime > endTime) break;

    // Ajouter l'heure formatée au tableau
    slots.push(
      `${currentHour.toString().padStart(2, "0")}h${currentMinute
        .toString()
        .padStart(2, "0")}`
    );

    // Ajouter 15 minutes
    currentMinute += 15;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour += 1;
    }
  }

  return slots;
}

export function useTransformGeneralInfos(
  openingHours: {
    noon?: {
      start: string;
      end: string;
    };
    evening?: {
      start: string;
      end: string;
    };
  },
  closedDays?: string[]
) {
  const daysOfWeek = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];
  const [openingDay, setOpeningDay] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!openingHours || !closedDays) return;

    // Vérifier si tous les jours sont fermés
    if (closedDays.length === 7) {
      setOpeningDay("Tous les jours sont fermés");
      setTimeSlots([]); // Aucune plage horaire disponible
      return;
    }

    // Liste des jours ouverts
    const openDays = daysOfWeek.filter((day) => {
      return !closedDays
        ?.map((day) => (typeof day === "string" ? day.toLowerCase() : ""))
        .includes(day);
    });

    // Vérifier si un seul jour est ouvert
    if (openDays.length === 1) {
      const noonHours =
        openingHours.noon?.start !== "00:00" &&
        openingHours.noon?.end !== "00:00"
          ? `${openingHours.noon.start}-${openingHours.noon.end}`
          : null;
      const eveningHours =
        openingHours.evening?.start !== "00:00" &&
        openingHours.evening?.end !== "00:00"
          ? `${openingHours.evening.start}-${openingHours.evening.end}`
          : null;

      setOpeningDay(
        `Le ${openDays[0].slice(0, 3)}. : ${noonHours ? noonHours : ""}${
          noonHours && eveningHours ? " & " : ""
        }${eveningHours ? eveningHours : ""}`
      );

      const noonSlots =
        noonHours !== null
          ? generateTimeSlots(openingHours.noon.start, openingHours.noon.end) ||
            []
          : [];
      const eveningSlots =
        eveningHours !== null
          ? generateTimeSlots(
              openingHours.evening.start,
              openingHours.evening.end
            ) || []
          : [];
      setTimeSlots([...noonSlots, ...eveningSlots]);
      return;
    }

    // Filtrer les jours de fermeture qui sont entre le premier et le dernier jour des jours ouverts
    const filteredClosedDays = closedDays?.filter((day) => {
      if (typeof day !== "string") return false; // Ignorer les valeurs non valides
      const dayIndex = daysOfWeek.indexOf(day.toLowerCase());
      const firstOpenDayIndex = daysOfWeek.indexOf(openDays[0]);
      const lastOpenDayIndex = daysOfWeek.indexOf(
        openDays[openDays.length - 1]
      );

      // Garder le jour de fermeture s'il est compris dans la plage des jours ouverts
      return dayIndex >= firstOpenDayIndex && dayIndex <= lastOpenDayIndex;
    });

    // Générer les heures d'ouverture pour plusieurs jours
    const noonHours =
      openingHours.noon?.start !== "00:00" && openingHours.noon?.end !== "00:00"
        ? `${openingHours.noon.start}-${openingHours.noon.end}`
        : null;
    const eveningHours =
      openingHours.evening?.start !== "00:00" &&
      openingHours.evening?.end !== "00:00"
        ? `${openingHours.evening.start}-${openingHours.evening.end}`
        : null;

    setOpeningDay(
      `Du ${openDays[0].slice(0, 3)}. au ${openDays[openDays.length - 1].slice(
        0,
        3
      )}.${
        filteredClosedDays && filteredClosedDays.length > 0
          ? `, sauf ${
              filteredClosedDays.length > 1
                ? `les ${filteredClosedDays
                    .map((day) => day.slice(0, 3) + ".")
                    .join(", ")}`
                : `le ${filteredClosedDays[0].slice(0, 3)}.`
            }`
          : ""
      } : ${noonHours ? noonHours : ""}${
        noonHours && eveningHours ? " & " : ""
      }${eveningHours ? eveningHours : ""}`
    );

    // Générer les plages horaires
    const noonSlots =
      noonHours !== null
        ? generateTimeSlots(openingHours.noon.start, openingHours.noon.end) ||
          []
        : [];
    const eveningSlots =
      eveningHours !== null
        ? generateTimeSlots(
            openingHours.evening.start,
            openingHours.evening.end
          ) || []
        : [];
    setTimeSlots([...noonSlots, ...eveningSlots]);
  }, [openingHours, closedDays]);

  return { openingDay, timeSlots };
}
