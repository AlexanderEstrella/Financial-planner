import React, { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [income, setIncome] = useState(""); // Initialize as a number
  const [bills, setBills] = useState([]); // State for bills as an array
  const [totalSavings, setTotalSavings] = useState("");

  let month = moment().format("MMM Do YY");

  const formatCurrency = (value) => {
    //handles NAN errors when user put in something that is not a number
    if (typeof value !== "string") {
      return "";
    }
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numericValue)) {
      return "";
    }
    return "$" + numericValue.toLocaleString("en-US");
  };

  const calculateTotalSavings = () => {
    const sum = bills.reduce((accumulator, currentValue) => {
      // use array method to seperator string values and add them all together before subtracting from income.
      const numericValue = parseFloat(currentValue.replace(/[^0-9.]/g, ""));
      return numericValue + accumulator;
    }, 0);

    setTotalSavings(income - sum);
  };

  const handleIncomeChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.]/g, ""));
    setIncome(numericValue); // Set the numeric value to the state
  };

  console.log(bills);
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

  return (
    <div className="Fcontainer">
      <div className="datacontainer">
        <h1 className="Date">{month}</h1>
        <label>Net Income:</label>
        <input
          type="text"
          className="dollar"
          value={"$" + income.toLocaleString()}
          onChange={handleIncomeChange}
          placeholder="Enter Net Income"
        />

        {bills.map((billValue, index) => (
          // Map bills to
          <div key={index} className="bill-input">
            <input
              type="text"
              className="dollarbill"
              value={billValue}
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
          value={"$" + totalSavings.toLocaleString()}
          placeholder="Total Savings"
        />
        <button className="Calculatebutton" onClick={calculateTotalSavings}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Home;
