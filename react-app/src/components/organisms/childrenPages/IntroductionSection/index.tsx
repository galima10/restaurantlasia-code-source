import styles from "./IntroductionSection.module.scss";

interface IntroductionSectionProps {
  type: "disposition1" | "disposition2";
  datas?: {
    images?: {
      img1?: {
        src?: string;
        alt?: string;
      };
      img2?: {
        src?: string;
        alt?: string;
      };
      img3?: {
        src?: string;
        alt?: string;
      };
      img4?: {
        src?: string;
        alt?: string;
      };
    };
    texts?: {
      text1?: string;
      text2?: string;
    };
  };
}

export default function IntroductionSection({
  type,
  datas,
}: IntroductionSectionProps) {
  return (
    <section
      className={
        type === "disposition1"
          ? styles.introductionSectionDisposition1
          : styles.introductionSectionDisposition2 +
            " " +
            styles.introductionSection
      }
    >
      <p>{(datas?.texts && datas?.texts?.text1) || "Paragraphe 1"}</p>
      <p>{(datas?.texts && datas?.texts?.text2) || "Paragraphe 2"}</p>
      <img
        src={datas?.images?.img1?.src || null}
        alt={datas?.images?.img1?.alt || "Image 1"}
        className="shadow"
        loading="lazy"
      />
      <img
        src={datas?.images?.img2?.src || null}
        alt={datas?.images?.img2?.alt || "Image 2"}
        className="shadow"
        loading="lazy"
      />
      <img
        src={datas?.images?.img3?.src || null}
        alt={datas?.images?.img3?.alt || "Image 3"}
        className="shadow"
        loading="lazy"
      />
      {type === "disposition2" && (
        <img
          src={datas?.images?.img4?.src || null}
          alt={datas?.images?.img4?.alt || "Image 4"}
          className="shadow"
          loading="lazy"
        />
      )}
    </section>
  );
}
