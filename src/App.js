import { useState } from "react";
import "./styles.css";

export default function App() {
  const [Operand1, setOperand1] = useState("");
  const [Operator, setOperator] = useState("");
  const [currentDigit, setCurrentDigit] = useState("0");
  const [steadyMode, setSteadyMode] = useState(true);
  var Operand2 = currentDigit;

  function digitHandler(digit) {
    if (currentDigit === "0") if (digit === "0") return;

    if (steadyMode) {
      if (digit === ".") setCurrentDigit(() => "0.");
      else setCurrentDigit(() => digit);
      setSteadyMode(() => false);
    } else if (digit === "." && currentDigit.includes(".")) return;
    else setCurrentDigit(() => currentDigit + digit);
  }

  function signHandler(sign) {
    if (Operand1 === "" || Operator === "") {
      if (sign === "=") return;
      setOperand1(() => currentDigit);
      setOperator(() => sign);
      setSteadyMode(() => true);
    } else {
      Operand2 = currentDigit;
      if (sign === "=") execute("");
      else execute(sign);
    }
  }

  function execute(tempOperator) {
    if (Operand2 === "0" && Operator === "/") {
      alert("Can not divide by zero");
      Clear();
      return;
    }
    var result = 0;
    switch (Operator) {
      case "+":
        result = Number(Operand1) + Number(Operand2);
        break;
      case "-":
        result = Number(Operand1) - Number(Operand2);
        break;
      case "x":
        result = Number(Operand1) * Number(Operand2);
        break;
      case "/":
        result = Number(Operand1) / Number(Operand2);
        break;
      default: {
        Clear();
        return;
      }
    }
    /* console.log("Operand1 " + Operand1);
    console.log("Operand2 " + Operand2);
    console.log("Operator1 " + Operator);
    console.log("Operand2 " + tempOperator);
    console.log(result + " result"); */

    setCurrentDigit(() => result);
    setOperand1(() => result);
    setSteadyMode(() => true);
    if (tempOperator !== "") setOperator(() => tempOperator);
    else setOperator(() => "");
  }

  function Clear() {
    setOperand1(() => "");
    setOperator(() => "");
    setCurrentDigit(() => "0");
    setSteadyMode(() => true);
  }

  return (
    <div className="App">
      <Monitor currentDigit={currentDigit} />

      <Digit numberr="7" digitHandler={digitHandler} />
      <Digit numberr="8" digitHandler={digitHandler} />
      <Digit numberr="9" digitHandler={digitHandler} />
      <Sign numberr="x" signHandler={signHandler} />
      <br />
      <Digit numberr="4" digitHandler={digitHandler} />
      <Digit numberr="5" digitHandler={digitHandler} />
      <Digit numberr="6" digitHandler={digitHandler} />
      <Sign numberr="-" signHandler={signHandler} />
      <br />
      <Digit numberr="1" digitHandler={digitHandler} />
      <Digit numberr="2" digitHandler={digitHandler} />
      <Digit numberr="3" digitHandler={digitHandler} />
      <Sign numberr="+" signHandler={signHandler} />
      <br />
      <Digit numberr="0" digitHandler={digitHandler} />
      <Digit numberr="." digitHandler={digitHandler} />
      <Sign numberr="/" signHandler={signHandler} />
      <Sign numberr="=" signHandler={signHandler} />
      <button id="clear" onClick={Clear}>
        C
      </button>
    </div>
  );
}

function Monitor({ currentDigit }) {
  return <div className="monitor">{currentDigit}</div>;
}

function Sign({ numberr, signHandler }) {
  return (
    <button className="digit" onClick={() => signHandler(numberr)}>
      {numberr}
    </button>
  );
}

function Digit({ numberr, digitHandler }) {
  return (
    <button className="digit" onClick={() => digitHandler(numberr)}>
      {numberr}
    </button>
  );
}
