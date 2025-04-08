import { Title } from '@components/common/title';
import { FC } from 'react';
import { BasePageUIProps } from './type';

export const BasePageUI: FC<BasePageUIProps> = ({ title }) => (
  <Title children={title} />
)