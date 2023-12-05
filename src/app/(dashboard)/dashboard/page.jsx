"use client";

import { useEffect, useMemo, useState } from "react";
import { FaHandHoldingUsd, FaWallet } from "react-icons/fa";
import { IoTrendingDown } from "react-icons/io5";
import { MdLogout, MdSavings } from "react-icons/md";

import { BarChart } from "@/components/dashboard/BarChart";
import CardSection from "@/components/dashboard/CardSection";
import { DoughnutChart } from "@/components/dashboard/DoughnutChart";
import { LineChart } from "@/components/dashboard/LineChart";

import { summaryServices } from "@/services/summary.services";
import { tokenServices } from "@/services/token.service";

import {
  SelectInterval,
  SelectKind,
  SelectMonth,
  SelectYear,
} from "@/components/dashboard/DropdownSelect";

import Link from "next/link";
import { useSidebarStore } from "@/stores/sidebar.store";

export default function Dashboard() {
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();

  const [summary, setSummary] = useState();
  const [loadingSummary, setLoadingSummary] = useState(true);

  const [tracker, setTracker] = useState([]);
  const [loadingTracker, setLoadingTracker] = useState(true);

  const [kind, setKind] = useState("all");
  const [interval, setInterval] = useState("month");
  const [isTrackingMonth, setIsTrackingMonth] = useState(interval === "month");
  const [detailInterval, setDetailInterval] = useState(isTrackingMonth ? thisMonth : thisYear);

  const { showSidebar } = useSidebarStore((store) => store);

  const isTrackerDataExist = tracker?.length > 0;
  const containerHeight = loadingTracker
    ? "min-h-[200px] md:min-h-[446px]"
    : isTrackerDataExist
    ? "min-h-fit"
    : "min-h-[200px] md:min-h-[446px]";

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
          setLoadingSummary(false);
        }
      } catch (error) {
        console.error(error);
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
          setLoadingTracker(false);
        }
      } catch (error) {
        console.error(error);
        setLoadingTracker(false);
      }
    })();
  }, [trackerOptions]);

  const emptyConditions = {
    all: summary?.totalExpense > 0 || summary?.totalIncome > 0,
    income: summary?.incomesByCategory.length > 0,
    expense: summary?.expensesByCategory.length > 0,
  };

  return (
    <div className="min-h-screen pt-4 pb-16">
      <div className="bg-white min-w-screen py-4 flex justify-between items-center">
        <h1 className="font-bold text-[32px] text-black ml-8">Dashboard</h1>
        <Link href="/login" onClick={tokenServices.removeAccessToken} className="mr-8 md:hidden">
          <MdLogout fill="black" size="2em" />
        </Link>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-y-5 p-8">
        {/* Card Info */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-5 mb-5 max-w-[1580px]">
          {cardData?.map((item, index) => {
            return <CardSection key={index} item={item} loadingSummary={loadingSummary} />;
          })}
        </div>

        <div
          className={`flex flex-col gap-y-5 md:grid md:grid-cols-2 md:gap-5 ${
            showSidebar ? "lg:grid-cols-2" : "lg:grid-cols-3"
          } ${containerHeight} max-w-[1580px]`}
        >
          {/* Graph */}
          {loadingTracker ? (
            <div
              className={`row-span-1 md:col-span-1 ${
                showSidebar ? "lg:col-span-1" : "lg:col-span-2"
              } grid place-items-center bg-white shadow-xl rounded-xl p-5`}
            >
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <div
              className={`row-span-1 md:col-span-1 ${
                showSidebar ? "lg:col-span-1" : "lg:col-span-2"
              } flex flex-col bg-white shadow-xl rounded-xl p-5 w-full`}
            >
              <div className="flex flex-col md:flex-row md:gap-x-5 items-center justify-between">
                <p className="font-bold text-xl mb-5 md:mb-0">Statistics</p>
                <div className="flex flex-wrap gap-3 justify-end">
                  <SelectInterval value={interval} setValue={setInterval} />
                  {isTrackingMonth ? (
                    <SelectMonth value={detailInterval} setValue={setDetailInterval} />
                  ) : (
                    <SelectYear value={detailInterval} setValue={setDetailInterval} />
                  )}
                </div>
              </div>

              {isTrackerDataExist ? (
                <div className="max-w-full overflow-x-auto">
                  <div className="flex justify-end gap-x-4 my-5 text-sm">
                    <div className="flex items-center gap-x-2 ">
                      <div className="bg-[#FF6756] w-4 h-4 rounded-full"></div>
                      <p>Expense</p>
                    </div>
                    <div className="flex items-center gap-x-2 ">
                      <div className="bg-[#74B6E3] w-4 h-4 rounded-full"></div>
                      <p>Income </p>
                    </div>
                  </div>
                  <div className="min-w-[400px]">
                    {isTrackingMonth ? (
                      <LineChart tracker={tracker} detailInterval={detailInterval} />
                    ) : (
                      <BarChart tracker={tracker} />
                    )}
                  </div>
                </div>
              ) : (
                <p className="h-full grid place-items-center text-center my-5 md:my-0">
                  Tidak terdapat data pada interval waktu tersebut ☹️
                </p>
              )}
            </div>
          )}

          {/* Doughnut Chart */}
          {loadingSummary ? (
            <div className="col-span-1  min-h-[200px] grid place-items-center bg-white shadow-xl rounded-xl p-5">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <div className="col-span-1 flex flex-col bg-white shadow-xl rounded-xl p-5">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-bold text-xl mb-5 md:mb-0">Overview</p>
                <SelectKind value={kind} setValue={setKind} />
              </div>
              {emptyConditions[kind] ? (
                <div className="grid place-items-center">
                  <div className="mt-10 w-[80%] md:w-full md:max-w-[200px] lg:max-w-[250px] xl:max-w-full grid place-items-center">
                    <DoughnutChart summary={summary} kind={kind} />
                  </div>
                </div>
              ) : (
                <p className="h-full grid place-items-center text-center my-5 md:my-0">
                  Tidak terdapat data pada kategori tersebut ☹️
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
