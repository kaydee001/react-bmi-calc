import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  return <BMICalc />;
}

function BMICalc() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);

  useEffect(() => {
    if (height !== "" && weight !== "") {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      const b = w / (h * h);
      setBMI(b.toFixed(1));
    } else {
      setBMI(null);
    }
  }, [height, weight]);

  const weightConversion = () => {
    const p = parseFloat(weight) * 2.20462;
    return `${p.toFixed(2)} lbs`;
  };

  const heightConversion = () => {
    const ft = Math.floor(parseFloat(height) / 2.54 / 12);
    const inc = (parseFloat(height) / 2.54) % 12;
    return `${ft.toFixed(0)} ft ${inc.toFixed(2)} in`;
  };

  const bmiCategory = () => {
    if (bmi === null) {
      return "";
    }
    const b = parseFloat(bmi);
    if (isNaN(b)) {
      return "";
    }
    if (b < 18.5) {
      return "Underweight";
    } else if (b >= 18.5 && b < 25) {
      return "Normal weight";
    } else if (b >= 25 && b < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  return (
    <div className="container">
      <h2>BMI Calculator</h2>
      <div>
        <label>Input Height (cms):</label>
        <input
          type="number"
          min="20"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <label>Input Weight (kgs):</label>
        <input
          type="number"
          min="5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="result">
        <span>Height</span>
        <label className="result-label">
          {height === "" ? "" : `${height} cms`} <br />
          <span>{height === "" ? "" : heightConversion()}</span>
        </label>
        <span>Weight</span>
        <label className="result-label">
          {weight === "" ? "" : `${weight} kgs`} <br />
          <span>{weight === "" ? "" : weightConversion()}</span>
        </label>
        <span>BMI</span>
        <label className="result-label">{bmi === null ? "" : bmi}</label>
        <span>Category</span>
        <label className="result-label">{bmiCategory()}</label>
      </div>
    </div>
  );
}
