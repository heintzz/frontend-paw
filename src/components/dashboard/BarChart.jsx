import React, { useMemo } from "react";
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
import { abbreviateMonthToFullName, indexToMonth } from "@/enums/date.enum";

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

export function BarChart({ tracker }) {
  const barChartData = useMemo(() => {
    let labels = tracker?.map((item) => item._id) || [];
    let expenseData = tracker?.map((item) => item.totalExpense) || [];
    let incomeData = tracker?.map((item) => item.totalIncome) || [];

    return {
      labels: labels?.map((index) => indexToMonth[index]),
      datasets: [
        {
          data: incomeData,
          backgroundColor: "#74B6E3",
          borderColor: "#74B6E3",
          borderWidth: 2,
          borderRadius: 12,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "#FF6756",
          borderColor: "#FF6756",
          borderWidth: 2,
          borderRadius: 12,
        },
      ],
    };
  }, [tracker]);

  return <Bar options={options} data={barChartData} />;
}
