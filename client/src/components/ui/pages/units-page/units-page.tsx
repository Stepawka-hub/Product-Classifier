import { BasePage } from "@pages";
import { FC } from 'react';
import { Button } from '@components/common/buttons';
import { UnitsPageUIProps } from './type';
import { TUnit } from '@utils/types';
import { Table } from '@components/table';

export const UnitsPageUI: FC<UnitsPageUIProps> = ({ headers, units, addUnit }) => (
  <BasePage title="Единицы измерения">
    <div className='content'>
      <Table<TUnit> headers={headers} elements={units} />
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
