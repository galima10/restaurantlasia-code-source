import styles from "./GallerySection.module.scss";

interface GallerySectionProps {
  datas?: {
    images?: {
      img1?: { src?: string; alt?: string }
      img2?: { src?: string; alt?: string }
      img3?: { src?: string; alt?: string }
      img4?: { src?: string; alt?: string }
      img5?: { src?: string; alt?: string }
    };
  };
}

export default function GallerySection({
  datas = {
    images: {
      img1: { src: null, alt: null },
      img2: { src: null, alt: null },
      img3: { src: null, alt: null },
      img4: { src: null, alt: null },
      img5: { src: null, alt: null },
    },
  },
}: GallerySectionProps) {
  return (
    <ul className={styles.gallerySection}>
      <li>
        <img
          className="shadow"
          src={datas?.images?.img1?.src || null}
          alt={datas?.images?.img1?.alt || "Image 1"}
          loading="lazy"
        />
      </li>
      <li>
        <img
          className="shadow"
          src={datas?.images?.img2?.src || null}
          alt={datas?.images?.img2?.alt || "Image 2"}
          loading="lazy"
        />
      </li>
      <li>
        <img
          className="shadow"
          src={datas?.images?.img3?.src || null}
          alt={datas?.images?.img3?.alt || "Image 3"}
          loading="lazy"
        />
      </li>
      <li>
        <img
          className="shadow"
          src={datas?.images?.img4?.src || null}
          alt={datas?.images?.img4?.alt || "Image 4"}
          loading="lazy"
        />
      </li>
      <li>
        <img
          className="shadow"
          src={datas?.images?.img5?.src || null}
          alt={datas?.images?.img5?.alt || "Image 5"}
          loading="lazy"
        />
      </li>
    </ul>
  );
}
