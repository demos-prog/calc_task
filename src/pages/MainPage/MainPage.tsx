import { useEffect, useState } from "react";
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
      setNumOfSheets(numOfSheets);
    } else {
      setNumOfSheets(null);
    }
  }, [list, width, length]);

  return (
    <div className={css.mainFrame}>
      <div className={css.leftSection}>
        <div>
          <select onChange={(e) => setList(e.target.value)}>
            <option value="">Choose sheet</option>
            {data
              .filter((i) => i.type === "list")
              .map((list) => (
                <option value={list.name}>{list.name}</option>
              ))}
          </select>
          {list}
        </div>

        <div>
          <select onChange={(e) => setPipe(e.target.value)}>
            <option value="">Choose pipe</option>
            {data
              .filter((i) => i.type === "pipe")
              .map((pipe) => (
                <option value={pipe.name}>{pipe.name}</option>
              ))}
          </select>
          {pipe}
        </div>

        <div>
          <p>Width</p>
          <input
            type="number"
            placeholder="Width"
            value={width}
            onChange={handleWidtInput}
          />
          {width}
        </div>

        <div>
          <p>Length</p>
          <input
            type="number"
            placeholder="Length"
            value={length}
            onChange={handleLenghtInput}
          />
          {length}
        </div>

        <div>
          <select onChange={(e) => setStrength(e.target.value)}>
            <option value="">Choose strength</option>
            {config
              .filter((i) => i.type === "frame")
              .map((frame) => (
                <option value={frame.name}>{frame.name}</option>
              ))}
          </select>
          {strength}
        </div>
      </div>
      <div className={css.rightSection}>
        <div>{numOfSheets && <p>Количество листов: {numOfSheets}</p>}</div>
      </div>
    </div>
  );
};

export default MainPage;
