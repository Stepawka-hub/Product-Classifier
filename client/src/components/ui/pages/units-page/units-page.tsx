import { BasePage } from "@pages";
import { FC } from 'react';
import { Button } from '@components/common/buttons';
import { UnitsPageUIProps } from './type';

export const UnitsPageUI: FC<UnitsPageUIProps> = ({ addUnit }) => (
  <BasePage title="Изделия">
    <div className='content'>
      <div>Какие-то единицы измерения...</div>
      <div>
        <Button
          type='plus'
          children="Добавить ЕИ"
          className='actionButton'
          onClick={addUnit}
        />
      </div>
    </div>
  </BasePage>
);
