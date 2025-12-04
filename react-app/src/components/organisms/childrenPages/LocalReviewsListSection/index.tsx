import styles from "./LocalReviewsListSection.module.scss";

import ReviewCard from "@components/molecules/ReviewCard";

interface LocalReviewSectionProps {
  datas?: {
    title?: string;
    reviews?: {
      name?: string;
      date?: string;
      text?: string;
    }[];
  };
}

export default function LocalReviewsListSection({ datas }: LocalReviewSectionProps) {
  return (
    <section className={styles.localReviewsListSection}>
      <h2>{datas?.title || "Titre de la section"}</h2>
      <ul className={styles.reviewList}>
        {datas?.reviews?.map((review, index) => (
          <li key={index}>
            <ReviewCard review={review} type="golden" noNote />
          </li>
        )) || <p className={styles.noReviews}>Aucun avis disponible.</p>}
      </ul>
    </section>
  );
}
