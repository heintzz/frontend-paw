import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { biColors, expenseCategoriesToColors, expenseColors } from "@/enums/category.enum";

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

export function DoughnutChart({ summary, kind }) {
  const doughnutChartData = useMemo(() => {
    let labels;
    let data;
    let backgroundColor = biColors;

    if (kind === "all") {
      labels = ["Income", "Expense"];
      data = [summary?.totalIncome || 0, summary?.totalExpense || 0];
    } else if (kind === "income") {
      labels = summary?.incomesByCategory.map((income) => income.category) || [];
      data = summary?.incomesByCategory?.map((income) => income.totalIncome) || [];
    } else {
      const sortedExpenseByCategory = summary?.expensesByCategory?.sort(
        (a, b) => b.totalExpense - a.totalExpense
      );
      labels = sortedExpenseByCategory?.map((expense) => expense.category) || [];
      data = sortedExpenseByCategory?.map((expense) => expense.totalExpense) || [];
      backgroundColor = labels.map((label) => expenseCategoriesToColors[label]);
    }

    return {
      labels,
      datasets: [
        {
          label: "Total",
          data: data,
          borderColor: backgroundColor,
          backgroundColor: backgroundColor,
        },
      ],
    };
  }, [summary, kind]);

  return <Doughnut data={doughnutChartData} options={options} className="max-h-[300px]" />;
}
