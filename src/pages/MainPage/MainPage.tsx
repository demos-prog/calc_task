import { useEffect, useState } from "react";
import data from "../../data/data.json";
import config from "../../data/config.json";
import css from "./MainPage.module.css";
import CalculatorForm from "../../components/CalculatorForm/CalculatorForm";
import ResultsTable from "../../components/ResultsTable/ResultsTable";
import Summary from "../../components/Summary/Summary";

const configWidthItem = config.find((i) => i.key === "width");
const configLengthItem = config.find((i) => i.key === "length");
const SHEET_LENGTH = 1;

const MainPage = function () {
  const [list, setList] = useState("");
  const [pipe, setPipe] = useState("");
  //Width of construction
  const [width, setWidth] = useState(configWidthItem?.min);
  //Length of construction
  const [length, setLength] = useState(configLengthItem?.min);
  const [strength, setStrength] = useState("");
  const [numOfSheets, setNumOfSheets] = useState<number | null>(null);
  const [pipesTotalLength, setPipesTotalLength] = useState<number | null>(null);
  const [fixAmount, setFixAmount] = useState<number | null>(null);
  const [cellWidth, setCellWidth] = useState<number | null>(null);
  const [cellLength, setCellLength] = useState<number | null>(null);
  const square = width! * length!;

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
      setCellWidth(step);
      setCellLength(step);
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
        <CalculatorForm
          list={list}
          pipe={pipe}
          strength={strength}
          width={width!}
          length={length!}
          onListChange={setList}
          onPipeChange={setPipe}
          onStrengthChange={setStrength}
          onWidthChange={setWidth}
          onLengthChange={setLength}
        />
      </div>
      <div className={css.rightSection}>
        <ResultsTable
          list={list}
          pipe={pipe}
          numOfSheets={numOfSheets}
          pipesTotalLength={pipesTotalLength}
          fixAmount={fixAmount}
          square={square}
        />
        <Summary
          square={square}
          pipesTotalLength={pipesTotalLength}
          fixAmount={fixAmount}
          cellWidth={cellWidth}
          cellLength={cellLength}
        />
      </div>
    </div>
  );
};

export default MainPage;
