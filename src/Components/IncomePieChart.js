import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement);

export const IncomePieChart = ({ totalIncome, totalBills }) => {
  // Data for the Pie chart
  const data = {
    labels: ["Total Income", "Total Bills"],
    datasets: [
      {
        data: [totalIncome, totalBills],
        backgroundColor: ["blue", "red"],
      },
    ],
  };

  // sets options for chart.js labels
  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Pie Chart",
        },
        datalabels: {
          color: "white",
          font: {
            weight: "bold",
          },
          formatter: (value, context) => {
            return context.chart.data.labels[context.dataIndex] + ": " + value;
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={config.options} />
    </div>
  );
};

export default IncomePieChart;
