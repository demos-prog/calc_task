import { useState } from "react";
import data from "../../data/data.json";
import config from "../../data/config.json";
import css from "./MainPage.module.css";

const configWidthItem = config.find((i) => i.key === "width");
const configLenghtItem = config.find((i) => i.key === "legth");

const MainPage = function () {
  const [list, setList] = useState("");
  const [pipe, setPipe] = useState("");
  const [width, setWidth] = useState(configWidthItem?.min);
  const [lenght, setLenght] = useState(configLenghtItem?.min);

  const handleWidtInput = (e: { target: { value: string } }) => {
    const inpValue = +e.target.value;

    if (inpValue < configWidthItem?.min! || inpValue > configWidthItem?.max!)
      return;

    setWidth(inpValue);
  };

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
          <input
            type="number"
            placeholder="Width"
            value={width}
            onChange={handleWidtInput}
          />
          {width}
        </div>
      </div>
      <div className={css.rightSection}></div>
    </div>
  );
};

export default MainPage;
