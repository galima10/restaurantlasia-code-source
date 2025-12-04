import styles from "./LocalReviewSection.module.scss";

import AppButton from "@components/atoms/AppButton";
import ReviewCard from "@components/molecules/ReviewCard";

interface LocalReviewSectionProps {
  datas?: {
    title?: string;
    description?: string;
    buttonCTA?: {
      link?: string;
      text?: string;
    };
    reviews?: {
      name?: string;
      date?: string;
      text?: string;
    }[];
  };
}

export default function LocalReviewSection({ datas }: LocalReviewSectionProps) {
  return (
    <section className={styles.localReviewSection}>
      <hgroup>
        <h2>{datas?.title || "Titre de la section"}</h2>
        <p>{datas?.description || "Description de la section"}</p>
        <AppButton
          className={styles.cta}
          link={datas?.buttonCTA?.link || "/"}
          text={datas?.buttonCTA?.text || "Bouton CTA"}
          type="primary"
        />
      </hgroup>
      <ul className={styles.reviewsList}>
        {datas?.reviews?.length > 0 ? (
          datas.reviews.map((review, index) => (
            <li key={index}>
              <ReviewCard review={review} type="golden" noNote />
            </li>
          ))
        ) : (
          <p className={styles.noReviews}>Aucun avis disponible.</p>
        )}
      </ul>
    </section>
  );
}
