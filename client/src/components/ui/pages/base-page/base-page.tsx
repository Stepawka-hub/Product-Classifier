import { Title } from "@components/common/title";
import { FC } from "react";
import { BasePageUIProps } from "./type";
import { SEO } from "@components/SEO";
import { Separator } from '@components/common/separator';

export const BasePageUI: FC<BasePageUIProps> = ({ title, children }) => (
  <>
    <SEO title={title} />
    <section>
      {title && <Title children={title} />}
      <Separator />
      {children}
    </section>
  </>
);
