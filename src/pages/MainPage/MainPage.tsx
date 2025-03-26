import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import data from "../../data/data.json";
import config from "../../data/config.json";
import css from "./MainPage.module.css";

const configWidthItem = config.find((i) => i.key === "width");
const configLengthItem = config.find((i) => i.key === "length");
const SHEET_LENGTH = 1;

const MainPage = function () {
  const [list, setList] = useState("");
  const [pipe, setPipe] = useState("");
  //Width of construction
  const [width, setWidth] = useState(configWidthItem?.min);
  //Length of construction
  const [length, setLenght] = useState(configLengthItem?.min);
  const [strength, setStrength] = useState("");
  const [numOfSheets, setNumOfSheets] = useState<number | null>(null);
  const [pipesTotalLength, setPipesTotalLength] = useState<number | null>(null);
  const [fixAmount, setFixAmount] = useState<number | null>(null);
  const square = width! * length!;

  const handleWidtInput = (e: { target: { value: string } }) => {
    const inpValue = +e.target.value;
    if (inpValue < configWidthItem?.min! || inpValue > configWidthItem?.max!)
      return;
    setWidth(inpValue);
  };

  const handleLenghtInput = (e: { target: { value: string } }) => {
    const inpValue = +e.target.value;
    if (inpValue < configLengthItem?.min! || inpValue > configLengthItem?.max!)
      return;
    setLenght(inpValue);
  };

  useEffect(() => {
    if (list !== "") {
      const listSquare =
        data.find((i) => i.name === list)?.width! * SHEET_LENGTH;
      const numOfSheets = Math.ceil(square / listSquare);
      const material = data.find((i) => i.name === list)?.material!;

      const item = config
        .filter((i) => i.type === "fix")
        .find((i) => i.key === material);

      const value = item?.value!;
      setFixAmount(square * value);
      setNumOfSheets(numOfSheets);
    } else {
      setNumOfSheets(null);
    }

    if (pipe !== "" && strength !== "") {
      const pipeWidth = data.find((i) => i.name === pipe)?.width! / 1000;
      const step = config.find((i) => i.name === strength)?.step! - pipeWidth;

      const pipesInWidth = Math.ceil(width! / step!) + 1;
      const pipesInLength = Math.ceil(length! / step!) + 1;
      const pipesTotalLength = pipesInWidth * length! + pipesInLength * width!;

      setPipesTotalLength(pipesTotalLength);
    } else {
      setPipesTotalLength(null);
    }
  }, [pipe, strength, list, width, length]);

  return (
    <div className={css.mainFrame}>
      <div className={css.leftSection}>
        <select value={list} onChange={(e) => setList(e.target.value)}>
          <option value="">Выберите лист</option>
          {data
            .filter((i) => i.type === "list")
            .map((list) => (
              <option key={uuidv4()} value={list.name}>
                {list.name}
              </option>
            ))}
        </select>

        <select value={pipe} onChange={(e) => setPipe(e.target.value)}>
          <option value="">Выберите трубу</option>
          {data
            .filter((i) => i.type === "pipe")
            .map((pipe) => (
              <option key={uuidv4()} value={pipe.name}>
                {pipe.name}
              </option>
            ))}
        </select>

        <div>
          <p>Ширина</p>
          <input
            type="number"
            placeholder="Width"
            value={width}
            onChange={handleWidtInput}
          />
        </div>

        <div>
          <p>Длина</p>
          <input
            type="number"
            placeholder="Length"
            value={length}
            onChange={handleLenghtInput}
          />
        </div>

        <select value={strength} onChange={(e) => setStrength(e.target.value)}>
          <option value="">Выберите прочность</option>
          {config
            .filter((i) => i.type === "frame")
            .map((frame) => (
              <option key={uuidv4()} value={frame.name}>
                {frame.name}
              </option>
            ))}
        </select>
      </div>
      <div className={css.rightSection}>
        <div>{numOfSheets && <p>Количество листов: {numOfSheets}</p>}</div>
        <div>{numOfSheets && <p>Количество метизов: {fixAmount}</p>}</div>
        <div>
          {pipesTotalLength && <p>Длина труб (м): {pipesTotalLength}</p>}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
