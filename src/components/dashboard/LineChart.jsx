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
          return "Day " + context[0].label;
        },
        label: function (context) {
          return "Rp" + convertNumberToCurrencyFormat(context.parsed.y);
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

export function LineChart({ data }) {
  return <Line options={options} data={data} />;
}
