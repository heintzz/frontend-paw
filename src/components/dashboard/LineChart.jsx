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
          return value / 1000 + "k";
        },
      },
    },
  },
};

export function LineChart({ data }) {
  return <Line options={options} data={data} />;
}
