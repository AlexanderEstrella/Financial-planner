import React, { useState } from "react";
import moment from "moment";

const Home = () => {
  const [income, setIncome] = useState("");
  const [bills, setBills] = useState([]); // State for bills as an array
  const [totalSavings, setTotalSavings] = useState("");

  let month = moment().format("MMM Do YY");

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numericValue)) {
      return "";
    }
    return "$" + numericValue.toLocaleString("en-US");
  };

  const handleIncomeChange = (e) => {
    const inputValue = e.target.value;
    setIncome(formatCurrency(inputValue));
  };

  const handleBillChange = (e, index) => {
    const inputValue = e.target.value;
    const updatedBills = [...bills];
    updatedBills[index] = formatCurrency(inputValue);
    setBills(updatedBills);
  };

  const handleDeleteBill = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
  };

  const addBill = () => {
    setBills([...bills, ""]); // Add an empty bill input
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
        {bills.map((billValue, index) => (
          <div key={index} className="bill-input">
            <input
              type="text"
              className="dollarbill"
              value={billValue}
              onChange={(e) => handleBillChange(e, index)}
              placeholder="Enter Bill"
            />
            <button
              className="delete-button"
              onClick={() => handleDeleteBill(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button onClick={addBill}>Add Bill</button>
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
