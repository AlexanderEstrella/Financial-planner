import React, { useState } from "react";
import moment from "moment";

const Home = () => {
  const [income, setIncome] = useState("");
  const [bill, setBill] = useState(""); // Add state for bills
  const [totalSavings, setTotalSavings] = useState(""); // Add state for total savings

  let month = moment().format("MMM Do YY");

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numericValue)) {
      return ""; // Return an empty string for non-numeric input// Handle empty input
    }
    return "$" + numericValue.toLocaleString("en-US");
  };

  const handleIncomeChange = (e) => {
    const inputValue = e.target.value;
    setIncome(formatCurrency(inputValue));
  };

  const handleBillChange = (e) => {
    const inputValue = e.target.value;
    setBill(formatCurrency(inputValue));
  };

  const handleTotalSavingsChange = (e) => {
    const inputValue = e.target.value;
    setTotalSavings(formatCurrency(inputValue));
  };

  return (
    <div className="Fcontainer">
      <div className="datacontainer">
        <h1 className="Date">{month}</h1>
        <label>Net Income:</label>

        <input
          type="text"
          className="dollar"
          value={income}
          onChange={handleIncomeChange}
          placeholder="Enter Net Income"
        />

        <input
          type="text"
          className="dollarbill"
          value={bill}
          onChange={handleBillChange}
          placeholder="Enter Bill"
        />

        <input
          type="text"
          className="dollartotalsavings"
          value={totalSavings}
          onChange={handleTotalSavingsChange}
          placeholder="Total Savings"
        />
      </div>
    </div>
  );
};

export default Home;
