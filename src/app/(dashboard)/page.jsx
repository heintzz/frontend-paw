"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaHandHoldingUsd, FaWallet } from "react-icons/fa";
import { IoTrendingDown } from "react-icons/io5";
import { MdSavings } from "react-icons/md";

import { BarChart } from "@/components/dashboard/BarChart";
import { DoughnutChart } from "@/components/dashboard/DoughnutChart";
import { LineChart } from "@/components/dashboard/LineChart";
import { indexToMonth } from "@/enums/date.enum";
import { biColors, expenseColors } from "@/enums/category.enum";

import { convertNumberToCurrencyFormat } from "@/helpers/helper";
import { summaryServices } from "@/services/summary.services";
import { tokenServices } from "@/services/token.service";

export default function Dashboard() {
  const router = useRouter();
  const isLogin = tokenServices.getUserLoginStatus();

  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();

  const [summary, setSummary] = useState();
  const [loadingSummary, setLoadingSummary] = useState(true);

  const [tracker, setTracker] = useState();
  const [loadingTracker, setLoadingTracker] = useState(true);

  const [kind, setKind] = useState("all");
  const [interval, setInterval] = useState("month");
  const [isTrackingMonth, setIsTrackingMonth] = useState(interval === "month");
  const [detailInterval, setDetailInterval] = useState(isTrackingMonth ? thisMonth : thisYear);

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
  }, [isLogin]);

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
    let backgroundColor;

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
      backgroundColor = expenseColors;
    }

    return {
      labels,
      datasets: [
        {
          label: "Total",
          data: data,
          borderWidth: 1,
          backgroundColor: backgroundColor || biColors,
        },
      ],
    };
  }, [summary, kind]);

  const trackerChartData = useMemo(() => {
    let labels = tracker?.map((item) => item._id) || [];
    let expenseData = tracker?.map((item) => item.totalExpense) || [];
    let incomeData = tracker?.map((item) => item.totalIncome) || [];

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
    <div className="min-h-screen pt-4 pb-8">
      <div className="bg-white min-w-screen py-4">
        <h1 className="font-bold text-[32px] text-black ml-8">Dashboard</h1>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-y-5 p-8">
        {/* Card Info */}
        <div className="flex flex-wrap md:flex-nowrap gap-y-5 gap-x-5 mb-5 max-w-[1580px]">
          {cardData?.map((item, index) => {
            const { name, amount, Icon } = item;
            return (
              <div
                key={index}
                className="flex flex-col justify-between w-full md:flex-grow h-[250px] p-4 rounded-lg shadow-xl hover:shadow-2xl bg-main"
              >
                <Icon size="3.5em" className="bg-white p-2 rounded-xl" />
                <div className="">
                  <p className="sm:text-xl font-medium">{name}</p>
                  <p className="sm:text-2xl font-semibold">
                    Rp{convertNumberToCurrencyFormat(amount)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-rows-1 md:grid-cols-3 md:gap-x-5 gap-y-5 min-h-[500px]">
          {/* Graph */}
          {loadingTracker ? (
            <div className="row-span-1 md:col-span-2 grid place-items-center bg-white shadow-xl rounded-xl p-5">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <div className="row-span-1 md:col-span-2 bg-white shadow-xl rounded-xl p-5">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="font-bold text-xl mb-5 md:mb-0">Statistics</p>
                <div className="flex gap-x-3">
                  <SelectInterval value={interval} setValue={setInterval} />
                  {isTrackingMonth ? (
                    <SelectMonth value={detailInterval} setValue={setDetailInterval} />
                  ) : (
                    <SelectYear value={detailInterval} setValue={setDetailInterval} />
                  )}
                </div>
              </div>

              {trackerChartData.labels?.length > 0 ? (
                <>
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
                </>
              ) : (
                <p className="grid place-items-center w-full h-full ">
                  Tidak terdapat data pada interval waktu tersebut ☹️
                </p>
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
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-bold text-xl mb-5 md:mt-0">Overview</p>
                <SelectKind value={kind} setValue={setKind} />
              </div>
              {doughnutChartData.datasets?.length === 0 ||
              doughnutChartData.datasets[0]?.data?.every((item) => item === 0) ? (
                <p className="grid place-items-center w-full h-full ">
                  Belum terdapat data pada kategori tersebut ☹️
                </p>
              ) : (
                <div className="mt-10">
                  <DoughnutChart data={doughnutChartData} />
                </div>
              )}
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
