import React, { useState } from "react";
import "./App.css";

function App() {
  const [income, setIncome] = useState("");
  const [tax, setTax] = useState(0);
  const [cess, setCess] = useState(0);
  const [surcharge, setSurcharge] = useState(0);

  const calculateTax = () => {
    let tax = 0;
    const incomeFloat = parseFloat(income);
    if (incomeFloat <= 250000) {
      tax = 0;
    } else if (incomeFloat <= 500000) {
      tax = (incomeFloat - 250000) * 0.05;
    } else if (incomeFloat <= 1000000) {
      tax = 12500 + (incomeFloat - 500000) * 0.2;
    } else {
      tax = 112500 + (incomeFloat - 1000000) * 0.3;
    }
    // Applying surcharge if applicable
    let surcharge = 0;
    if (incomeFloat > 10000000) {
      surcharge =
        incomeFloat > 10000000 && incomeFloat <= 50000000
          ? tax * 0.1
          : tax * 0.15;
      tax += surcharge;
    }
    // Adding health and education cess
    const cess = tax * 0.04; // Health and education cess rate
    tax += cess;

    setTax(tax);
    setCess(cess);
    setSurcharge(surcharge);
  };

  return (
    <div className="container">
      <h2>Income Tax Calculator</h2>
      <div className="input-group">
        <label htmlFor="income">Enter your annual income: </label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={calculateTax} className="button">
        Calculate Tax
      </button>
      {tax > 0 && (
        <div>
          <p className="result">Your income tax is: {tax}</p>
          {cess > 0 && (
            <p className="result">Health and Education Cess: {cess}</p>
          )}
          {surcharge > 0 && <p className="result">Surcharge: {surcharge}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
