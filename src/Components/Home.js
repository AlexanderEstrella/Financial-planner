import React, { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { IncomePieChart } from "./IncomePieChart";

const Home = () => {
  const [income, setIncome] = useState(0);
  const [bills, setBills] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalBills, setTotalBills] = useState(0);

  let month = moment().format("MMM Do YY");

  const formatCurrency = (value) => {
    if (typeof value !== "string") {
      return 0;
    }
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numericValue)) {
      return 0;
    }
    return numericValue;
  };

  const calculateTotalSavings = () => {
    const sum = bills.reduce((accumulator, currentValue) => {
      // use array method to seperator string values and add them all together before subtracting from income.
      const numericValue = parseFloat(
        currentValue.toString().replace(/^\s+|\s+$/g, "")
      );
      return numericValue + accumulator;
    }, 0);

    console.log(sum + " this is sum");
    setTotalBills(sum); // Update the totalBills state
    setTotalSavings(income - sum);
  };

  const handleIncomeChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.]/g, ""));
    setIncome(numericValue);
  };

  const handleBillChange = (e, index) => {
    const inputValue = e.target.value;
    const updatedBills = [...bills];
    updatedBills[index] = formatCurrency(inputValue);
    console.log(updatedBills);
    setBills(updatedBills);
  };

  const handleDeleteBill = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
  };

  const addBill = () => {
    setBills([...bills, 0]);
  };

  return (
    <div className="Fcontainer">
      <div className="datacontainer">
        <h1 className="Date">{month}</h1>
        <label>Net Income:</label>
        <input
          type="text"
          className="dollar"
          value={income === 0 ? "" : "$" + income.toLocaleString()}
          onChange={handleIncomeChange}
          placeholder="Enter Net Income"
        />

        {bills.map((billValue, index) => (
          <div key={index} className="bill-input">
            <input
              type="text"
              className="dollarbill"
              value={billValue === 0 ? "" : "$" + billValue.toLocaleString()}
              onChange={(e) => handleBillChange(e, index)}
              placeholder="Enter Bill"
            />
            <FontAwesomeIcon
              icon={faDeleteLeft}
              className="fa-lg text-danger"
              onClick={() => handleDeleteBill(index)}
            />
          </div>
        ))}
        <button className="Addbutton" onClick={addBill}>
          Add a bill
        </button>
        <input
          type="text"
          className="dollartotalsavings"
          value={totalSavings === 0 ? "" : "$" + totalSavings.toLocaleString()}
          placeholder="Total Savings"
        />
        <button className="Calculatebutton" onClick={calculateTotalSavings}>
          Calculate
        </button>
      </div>

      <IncomePieChart totalIncome={income} totalBills={totalBills} />
    </div>
  );
};

export default Home;
