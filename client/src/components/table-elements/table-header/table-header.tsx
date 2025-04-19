import { FC } from 'react';
import { TableHeaderProps } from './type';
import s from '@ui/table/table.module.css';

export const TableHeader: FC<TableHeaderProps> = ({ headers }) => (
  <thead className={s.thead}>
    <tr>
      {headers.map((header, index) => (
        <th key={index}>{header}</th>
      ))}
      <th>Действия</th>
    </tr>
  </thead>
);