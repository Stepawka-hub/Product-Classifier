import { FC } from "react";
import { BasePageProps } from "./type";
import { SEO } from "@components/SEO";
import { Title } from "@components/common/title";
import { Separator } from "@components/common/separator";

export const BasePage: FC<BasePageProps> = ({ title, children }) => (
  <>
    <SEO title={title} />
    <section>
      {title && (
        <>
          <Title children={title} />
          <Separator />
        </>
      )}
      {children}
    </section>
  </>
);
