import { FC } from "react";
import { SEOProps } from "./type";

export const SEO: FC<SEOProps> = ({ title, description }) => (
  <>
    <title>{title || "Product Classifier"}</title>
    <meta
      name="description"
      content={
        description ||
        `Product Classier — это удобный сервис для классификации продуктов!`
      }
    />
  </>
);
