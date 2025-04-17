import { Button } from '@components/common/buttons';
import { FC } from 'react';

export const BaseAddFormUI: FC = () => {
  return (
    <form>
      <input />
      <Button children='Добавить' />
      <Button children='Отмена' />
    </form>
  )
}