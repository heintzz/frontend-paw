"use client";

import { BarChart } from "@/components/dashboard/BarChart";
import { DoughnutChart } from "@/components/dashboard/DoughnutChart";
import { LineChart } from "@/components/dashboard/LineChart";
import { indexToMonth } from "@/enums/enum";
import { convertNumberToCurrencyFormat } from "@/helpers/helper";
import { summaryServices } from "@/services/summary.services";
import { useEffect, useMemo, useState } from "react";
import { FaHandHoldingUsd, FaWallet } from "react-icons/fa";
import { IoTrendingDown } from "react-icons/io5";
import { MdSavings } from "react-icons/md";

export default function Dashboard() {
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();

  const [summary, setSummary] = useState();
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [tracker, setTracker] = useState();
  const [loadingTracker, setLoadingTracker] = useState(false);

  const [kind, setKind] = useState("all");
  const [interval, setInterval] = useState("month");
  const [isTrackingMonth, setIsTrackingMonth] = useState(interval === "month");
  const [detailInterval, setDetailInterval] = useState(isTrackingMonth ? thisMonth : thisYear);

  const cardData = useMemo(() => {
    const totalBalance = summary?.totalIncome - summary?.totalExpense || 0;
    const totalIncome = summary?.totalIncome || 0;
    const totalExpense = summary?.totalExpense || 0;
    const totalSaving = summary?.totalSaving || 0;

    return [
      {
        name: "Balance",
        amount: totalBalance,
        Icon: FaWallet,
      },
      {
        name: "Income",
        amount: totalIncome,
        Icon: FaHandHoldingUsd,
      },
      {
        name: "Expense",
        amount: totalExpense,
        Icon: IoTrendingDown,
      },
      {
        name: "Saving",
        amount: totalSaving,
        Icon: MdSavings,
      },
    ];
  }, [summary]);

  const trackerOptions = useMemo(() => {
    if (isTrackingMonth) {
      return {
        year: new Date().getFullYear(),
        month: detailInterval,
      };
    }

    return {
      year: detailInterval,
    };
  }, [detailInterval, isTrackingMonth]);

  const doughnutChartData = useMemo(() => {
    let labels;
    let data;

    if (kind === "all") {
      labels = ["Income", "Expense"];
      data = [summary?.totalIncome || 0, summary?.totalExpense || 0];
    } else if (kind === "income") {
      labels = ["Monthly", "Non Monthly"];
      data = summary?.incomesByCategory?.map((income) => income.totalIncome);
    } else {
      labels = summary?.expensesByCategory?.map((expense) => expense.category);
      data = summary?.expensesByCategory?.map((expense) => expense.totalExpense);
    }

    return {
      labels,
      datasets: [
        {
          label: "Total",
          data: data,
          backgroundColor:
            kind === "expense"
              ? [
                  "#fd7f6f",
                  "#7eb0d5",
                  "#b2e061",
                  "#bd7ebe",
                  "#ffb55a",
                  "#ffee65",
                  "#beb9db",
                  "#fdcce5",
                  "#8bd3c7",
                ]
              : ["#00A9FF", "red"],
          borderWidth: 1,
        },
      ],
    };
  }, [summary, kind]);

  const trackerChartData = useMemo(() => {
    let labels = tracker?.map((item) => item._id);
    let expenseData = tracker?.map((item) => item.totalExpense);
    let incomeData = tracker?.map((item) => item.totalIncome);

    return {
      labels: isTrackingMonth ? labels : labels?.map((index) => indexToMonth[index]),
      datasets: [
        {
          data: incomeData,
          backgroundColor: "#00A9FF",
          borderColor: "#00A9FF",
          borderWidth: 2,
          borderRadius: 12,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 2,
          borderRadius: 12,
        },
      ],
    };
  }, [tracker, isTrackingMonth]);

  useEffect(() => {
    setDetailInterval(isTrackingMonth ? thisMonth : thisYear);
  }, [thisMonth, thisYear, isTrackingMonth]);

  useEffect(() => {
    setIsTrackingMonth(interval === "month");
  }, [interval]);

  useEffect(() => {
    setLoadingSummary(true);

    (async () => {
      try {
        const res = await summaryServices.getSummary();
        if (res.success) {
          setSummary(res?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSummary(false);
      }
    })();
  }, []);

  useEffect(() => {
    setLoadingTracker(true);
    (async () => {
      try {
        const res = await summaryServices.getTrackerHistory(trackerOptions);
        if (res.success) {
          setTracker(res?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTracker(false);
      }
    })();
  }, [trackerOptions]);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-semibold bg-white px-5 py-5">Hello, Hasnan👋</h1>
      {/* Content */}
      <div className="flex flex-col gap-y-5 p-5">
        {/* Card Info */}
        <div className="flex flex-wrap md:flex-nowrap gap-y-5 gap-x-5 mb-5">
          {cardData?.map((item, index) => {
            const { name, amount, Icon } = item;
            return (
              <div
                key={index}
                className="flex flex-col justify-between w-full md:flex-grow h-[180px] p-4 rounded-lg shadow-xl hover:shadow-2xl bg-main"
              >
                <Icon size="3.5em" className="bg-white p-2 rounded-xl" />
                <div className="">
                  <p className="text-lg font-medium">{name}</p>
                  <p className="text-xl font-semibold">Rp{convertNumberToCurrencyFormat(amount)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-rows-1 md:grid-cols-3 md:gap-x-5 gap-y-5">
          {/* Graph */}
          {loadingTracker ? (
            <div className="row-span-1 md:col-span-2 grid place-items-center bg-white shadow-xl rounded-xl p-5">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <div className="row-span-1 md:col-span-2 bg-white shadow-xl rounded-xl p-5">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="font-bold text-xl mb-5 md:mb-0">2023&apos;s History</p>
                <div className="flex gap-x-3">
                  <SelectInterval value={interval} setValue={setInterval} />
                  {isTrackingMonth ? (
                    <SelectMonth value={detailInterval} setValue={setDetailInterval} />
                  ) : (
                    <SelectYear value={detailInterval} setValue={setDetailInterval} />
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-x-4 my-5 text-sm">
                <div className="flex items-center gap-x-2 ">
                  <div className="bg-red-500 w-4 h-4 rounded-full"></div>
                  <p>Expense</p>
                </div>
                <div className="flex items-center gap-x-2 ">
                  <div className="bg-[#00A9FF] w-4 h-4 rounded-full"></div>
                  <p>Income </p>
                </div>
              </div>

              {isTrackingMonth ? (
                <LineChart data={trackerChartData} />
              ) : (
                <BarChart data={trackerChartData} />
              )}
            </div>
          )}

          {/* Doughnut Chart */}
          {loadingSummary ? (
            <div className="col-span-1 grid place-items-center bg-white shadow-xl rounded-xl p-5">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <div className="col-span-1 bg-white shadow-xl rounded-xl p-5">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <p className="font-bold text-xl mb-5 md:mt-0">Overview</p>
                <SelectKind value={kind} setValue={setKind} />
              </div>
              <DoughnutChart data={doughnutChartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SelectInterval = ({ value, setValue }) => {
  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      <option value="month">Month</option>
      <option value="year">Year</option>
    </select>
  );
};

const SelectMonth = ({ value, setValue }) => {
  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      {Object.keys(indexToMonth).map((index) => {
        return (
          <option value={index} key={index}>
            {indexToMonth[index]}
          </option>
        );
      })}
    </select>
  );
};

const SelectYear = ({ value, setValue }) => {
  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      <option value="2023">2023</option>
      <option value="2022">2022</option>
    </select>
  );
};

const SelectKind = ({ value, setValue }) => {
  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      <option value="all">All</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  );
};
