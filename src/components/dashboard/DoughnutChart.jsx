import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          family: "Poppins",
        },
      },
      position: "bottom",
    },
    title: {
      display: false,
    },
    tooltip: {
      titleFont: {
        family: "Poppins",
      },
      bodyFont: {
        family: "Poppins",
      },
    },
  },
};

export function DoughnutChart({ data }) {
  return <Doughnut data={data} options={options} />;
}
