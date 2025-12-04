import styles from "./ReviewCard.module.scss";

import Star from "@components/atoms/Star";
import { useEffect, useRef } from "react";

interface ReviewCardProps {
  review?: {
    name?: string;
    date?: string;
    rating?: number;
    text?: string;
  };
  type: "white" | "golden";
  noNote?: boolean;
}

export default function ReviewCard({ review, type, noNote }: ReviewCardProps) {
  const ratingRef = useRef<HTMLUListElement>(null);
  const STAR_WIDTH = 1.2; // Largeur d'une étoile en em

  useEffect(() => {
    if (ratingRef.current && review?.rating) {
      const stars = ratingRef.current;
      const totalWidth = STAR_WIDTH * review.rating; // Largeur totale en em
      stars.style.width = `${totalWidth}em`;
    }
  }, [review?.rating]);
  return (
    <div className={type !== "golden" ? styles.whiteCard : styles.goldenCard}>
      <div className={styles.headerCard}>
        <p>
          <strong>{review?.name}</strong>
        </p>
        <div className={styles.infos}>
          {!noNote && (
            <>
              <div className={styles.rating}>
                <ul className={styles.stars} ref={ratingRef}>
                  <li>
                    <Star />
                  </li>
                  <li>
                    <Star />
                  </li>
                  <li>
                    <Star />
                  </li>
                  <li>
                    <Star />
                  </li>
                  <li>
                    <Star />
                  </li>
                </ul>
              </div>
              <p className={styles.ratingText}>
                <small>({review?.rating}/5)</small>
              </p>
            </>
          )}
          <p className={styles.date}>
            <small>— {review?.date}</small>
          </p>
        </div>
      </div>
      <div className={styles.reviewText}>
        <p>« {review?.text} »</p>
      </div>
    </div>
  );
}
