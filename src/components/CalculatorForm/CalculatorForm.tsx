import { FC } from 'react';
import { v4 as uuidv4 } from "uuid";
import data from "../../data/data.json";
import config from "../../data/config.json";
import css from './CalculatorForm.module.css';

interface CalculatorFormProps {
  list: string;
  pipe: string;
  strength: string;
  width: number;
  length: number;
  onListChange: (value: string) => void;
  onPipeChange: (value: string) => void;
  onStrengthChange: (value: string) => void;
  onWidthChange: (value: number) => void;
  onLengthChange: (value: number) => void;
}

const CalculatorForm: FC<CalculatorFormProps> = ({
  list,
  pipe,
  strength,
  width,
  length,
  onListChange,
  onPipeChange,
  onStrengthChange,
  onWidthChange,
  onLengthChange,
}) => {
  const configWidthItem = config.find((i) => i.key === "width");
  const configLengthItem = config.find((i) => i.key === "length");

  const handleWidthInput = (e: { target: { value: string } }) => {
    const inpValue = +e.target.value;
    if (inpValue < configWidthItem?.min! || inpValue > configWidthItem?.max!) return;
    onWidthChange(inpValue);
  };

  const handleLengthInput = (e: { target: { value: string } }) => {
    const inpValue = +e.target.value;
    if (inpValue < configLengthItem?.min! || inpValue > configLengthItem?.max!) return;
    onLengthChange(inpValue);
  };

  return (
    <div className={css.form}>
      <select className={css.select} value={list} onChange={(e) => onListChange(e.target.value)}>
        <option value="">Выберите лист</option>
        {data
          .filter((i) => i.type === "list")
          .map((list) => (
            <option key={uuidv4()} value={list.name}>
              {list.name}
            </option>
          ))}
      </select>

      <select className={css.select} value={pipe} onChange={(e) => onPipeChange(e.target.value)}>
        <option value="">Выберите трубу</option>
        {data
          .filter((i) => i.type === "pipe")
          .map((pipe) => (
            <option key={uuidv4()} value={pipe.name}>
              {pipe.name}
            </option>
          ))}
      </select>

      <select className={css.select} value={strength} onChange={(e) => onStrengthChange(e.target.value)}>
        <option value="">Выберите прочность</option>
        {config
          .filter((i) => i.type === "frame")
          .map((frame) => (
            <option key={uuidv4()} value={frame.name}>
              {frame.name}
            </option>
          ))}
      </select>

      <div className={css.inputGroup}>
        <label className={css.label}>Ширина</label>
        <input
          className={css.input}
          type="number"
          placeholder="Width"
          value={width}
          onChange={handleWidthInput}
        />
      </div>

      <div className={css.inputGroup}>
        <label className={css.label}>Длина</label>
        <input
          className={css.input}
          type="number"
          placeholder="Length"
          value={length}
          onChange={handleLengthInput}
        />
      </div>
    </div>
  );
};

export default CalculatorForm; 