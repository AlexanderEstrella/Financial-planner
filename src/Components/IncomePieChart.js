import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement);

export const IncomePieChart = ({ totalIncome, totalBills }) => {
  // Data for the Pie chart
  const data = {
    labels: ["Total Income", "Total Bills"],
    datasets: [
      {
        data: [totalIncome, totalBills],
        backgroundColor: ["blue", "red"],
        hoversetoff: 4,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const labelIndex = context.dataIndex;
            return (
              data.labels[labelIndex] +
              ": $" +
              data.datasets[0].data[labelIndex].toLocaleString()
            );
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={{ options }} />
    </div>
  );
};

export default IncomePieChart;
