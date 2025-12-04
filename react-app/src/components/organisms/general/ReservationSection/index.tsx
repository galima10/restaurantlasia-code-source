import styles from "./ReservationSection.module.scss";

import ReservationIntroduction from "../reservationBlocs/ReservationIntroduction";
import PhysicalReservation from "../reservationBlocs/PhysicalReservation";
import OnlineReservation from "../reservationBlocs/OnlineReservation";

interface ReservationSectionProps {
  datas?: {
    introduction?: {
      title?: string;
      description?: string;
    };
    physicalReservation?: {
      slogan?: string;
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
    confirmationLink?: string;
  };
}

export default function ReservationSection({
  datas = {
    introduction: {
      title: null,
      description: null,
    },
    physicalReservation: null,
    backgroundImage: null,
    globalInfo: {
      openingHours: null,
      closedDays: null,
      phoneNumber: null,
      address: null,
    },
  },
}: ReservationSectionProps) {
  return (
    <div className={styles.reservationSection}>
      <ReservationIntroduction
        className={styles.reservationIntroduction}
        introduction={datas?.introduction}
        backgroundImage={datas?.backgroundImage}
      />
      <div className={styles.reservationBlocs}>
        <PhysicalReservation
          className={`${styles.physicalReservation} shadow`}
          physicalReservation={datas?.physicalReservation || null}
          globalInfo={datas?.globalInfo || null}
        />
        <OnlineReservation
          className={styles.onlineReservation}
          globalInfo={datas?.globalInfo || null}
          confirmationLink={datas?.confirmationLink || null}
        />
      </div>
    </div>
  );
}
