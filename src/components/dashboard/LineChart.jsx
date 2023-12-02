import { convertNumberToCurrencyFormat } from "@/helpers/helper";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function LineChart({ tracker, detailInterval }) {
  const thisYear = new Date().getFullYear();
  const dayInThisMonth = new Date(thisYear, detailInterval, 0).getDate();
  let labels = tracker?.map((item) => item._id) || [];
  let expenseData = tracker?.map((item) => item.totalExpense) || [];
  let incomeData = tracker?.map((item) => item.totalIncome) || [];

  const trackerChartData = {
    labels: labels,
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

  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: false,
      tooltip: {
        titleFont: {
          family: "Poppins",
        },
        bodyFont: {
          family: "Poppins",
        },
        callbacks: {
          title: function (context) {
            return "Day " + context[0].label;
          },
          label: function (context) {
            return "Rp" + convertNumberToCurrencyFormat(context.parsed.y);
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        type: "linear",
        ticks: {
          font: {
            family: "Poppins",
            size: 12,
          },
          stepSize: 1,
        },
        min: 1,
        max: dayInThisMonth,
      },
      y: {
        grace: "5%",
        beginAtZero: true,
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

  return <Line options={options} data={trackerChartData} className="max-h-[300px]" />;
}
