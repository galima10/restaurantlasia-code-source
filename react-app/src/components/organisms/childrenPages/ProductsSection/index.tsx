import styles from "./ProductsSection.module.scss";

import ProductsCategory from "@components/molecules/ProductsCategory";

interface ProductsSectionProps {
  datas?: {
    products?: Array<{
      categoryName?: string;
      products?: Array<{
        name?: string;
        image: { src?: string; alt?: string };
        link?: string;
      }>;
    }>;
  };
}

export default function ProductsSection({ datas }: ProductsSectionProps) {
  return (
    <ul className={styles.productsSection}>
      {datas?.products?.length > 0 ? (
        datas.products.map((category, index) => (
          <li key={index}>
            <ProductsCategory
              categoryName={category?.categoryName}
              products={category?.products}
            />
          </li>
        ))
      ) : (
        <p className={styles.noProducts}>Aucun produit disponible</p>
      )}
    </ul>
  );
}
