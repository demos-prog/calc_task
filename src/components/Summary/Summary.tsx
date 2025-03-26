import { FC } from 'react';
import css from './Summary.module.css';

interface SummaryProps {
  square: number;
  pipesTotalLength: number | null;
  fixAmount: number | null;
  cellWidth: number | null;
  cellLength: number | null;
}

const Summary: FC<SummaryProps> = ({
  square,
  pipesTotalLength,
  fixAmount,
  cellWidth,
  cellLength,
}) => {
  return (
    <div className={css.summary}>
      <div className={css.total}>
        Итого: {square + (pipesTotalLength || 0) + (fixAmount || 0)}
      </div>
      <div className={css.cellSize}>
        {cellWidth && cellLength && (
          <p>Размер ячейки (м): {`${cellWidth}х${cellLength}`}</p>
        )}
      </div>
    </div>
  );
};

export default Summary; 