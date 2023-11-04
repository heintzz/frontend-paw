import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { abbreviateMonthToFullName } from "@/enums/date.enum";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
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
      callbacks: {
        title: function (context) {
          const abbreviate = context[0].label;
          return abbreviateMonthToFullName[abbreviate];
        },
      },
    },
  },

  scales: {
    x: {
      ticks: {
        font: {
          family: "Poppins",
          size: 12,
        },
      },
    },
    y: {
      grace: "5%",
      ticks: {
        font: {
          family: "Poppins",
          size: 12,
        },
        callback: function (value) {
          const thousandMultiplier = 1000;
          if (value >= thousandMultiplier ** 2) return value / thousandMultiplier ** 2 + "M";
          else if (value >= thousandMultiplier) return value / thousandMultiplier + "K";
        },
      },
    },
  },
};

export function BarChart({ data }) {
  return <Bar options={options} data={data} />;
}
