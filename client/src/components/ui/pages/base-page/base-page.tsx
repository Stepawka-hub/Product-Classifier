import { Title } from "@components/common/title";
import { FC } from "react";
import { BasePageUIProps } from "./type";
import { SEO } from "@components/SEO";

export const BasePageUI: FC<BasePageUIProps> = ({ title, children }) => (
  <>
    <SEO title={title} />
    <section>
      {title && <Title children={title} />}
      {children}
    </section>
  </>
);
