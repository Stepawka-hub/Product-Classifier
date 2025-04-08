import { FC } from 'react';
import { BasePage } from "@pages";
import { Button } from '@components/common/buttons';
import { ProductsPageUIProps } from './type';

export const ProductsPageUI: FC<ProductsPageUIProps> = ({ addProduct }) => (
  <BasePage title="Изделия">
    <div className='content'>
      <div>Какие-то изделия...</div>
      <div>
        <Button
          type='plus'
          children="Добавить продукт"
          className='actionButton'
          onClick={addProduct}
        />
      </div>
    </div>
  </BasePage>
);
