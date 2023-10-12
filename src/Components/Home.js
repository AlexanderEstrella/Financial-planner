import React, { useState } from "react";
import moment from "moment";
const Home = () => {
  const [income, setIncome] = useState("");

  let month = moment().format("MMM Do YY");
  const updatedValue = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };
  return (
    <div className="Fcontainer">
      <h1 className="Date">{month}</h1>
      <div>
        <label>Net Income:</label>
        <span>
          <input
            type="text"
            className="dollar"
            value={income}
            onChange={handleIncomeChange}
          ></input>
        </span>
      </div>
      <div>
        <label>Formatted Income:</label>
        <span>{updatedValue(income)}</span>
      </div>
    </div>
  );
};

export default Home;
