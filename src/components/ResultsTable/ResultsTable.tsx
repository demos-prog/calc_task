import { FC } from 'react';
import css from './ResultsTable.module.css';

interface ResultsTableProps {
  list: string;
  pipe: string;
  numOfSheets: number | null;
  pipesTotalLength: number | null;
  fixAmount: number | null;
  square: number;
}

const ResultsTable: FC<ResultsTableProps> = ({
  list,
  pipe,
  numOfSheets,
  pipesTotalLength,
  fixAmount,
  square,
}) => {
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th>Наименование</th>
          <th>ед.</th>
          <th>кол-во</th>
          <th>сумма</th>
        </tr>
      </thead>
      <tbody>
        {numOfSheets && (
          <tr>
            <td>{list}</td>
            <td>м2</td>
            <td>{numOfSheets}</td>
            <td>{square}</td>
          </tr>
        )}
        {pipesTotalLength && (
          <tr>
            <td>{pipe}</td>
            <td>мп</td>
            <td>{}</td>
            <td>{pipesTotalLength}</td>
          </tr>
        )}
        {numOfSheets && (
          <tr>
            <td>Саморез</td>
            <td>шт</td>
            <td>{}</td>
            <td>{fixAmount}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ResultsTable; 