import styles from "./ProductsCategory.module.scss";

import ProductPreviewElement from "@components/molecules/ProductPreviewElement";

interface ProductsCategoryProps {
  categoryName?: string;
  products?: Array<{
    name?: string;
    image: { src?: string, alt?: string };
    link?: string;
  }>;
}

export default function ProductsCategory({
  categoryName,
  products,
}: ProductsCategoryProps) {
  return (
    <section className={styles.productsCategory}>
      <h2>{categoryName || "Catégorie de produits"}</h2>
      <ul>
        {products?.map((product, index) => (
          <li key={index}>
            <ProductPreviewElement name={product?.name} src={product?.image?.src} alt={product?.image?.alt} link={product?.link} />
          </li>
        ))}
      </ul>
    </section>
  );
}
