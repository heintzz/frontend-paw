"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useSorting from "@/app/hooks/useSorting";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { incomeCategories } from "@/enums/category.enum";
import { formatDate } from "@/helpers/helper";
import { incomeServices } from "@/services/income.services";
import { convertNumberToCurrencyFormat } from "@/helpers/helper";

const IncomePage = () => {
  const router = useRouter();

  const [incomeData, setIncomeData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const [sortOrder, sortColumn, toggleSortOrder, sortData] = useSorting(incomeData);

  const sortedIncomeData = sortData();

  useEffect(() => {
    // Fetch income data and update the state
    incomeServices
      .getIncomeData()
      .then((data) => {
        setIncomeData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching income data:", error);
      });
  }, []);

  const filterIncomeData = (item) => {
    if (!applyFilter) return true;

    if (selectedCategory && (item.incomeMonthly ? "Bulanan" : "Non Bulanan") !== selectedCategory) {
      return false;
    }
    if (minAmount && item.incomeAmount < minAmount) {
      return false;
    }
    if (maxAmount && item.incomeAmount > maxAmount) {
      return false;
    }
    return true;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinAmountChange = (e) => {
    setMinAmount(e.target.value);
  };

  const handleMaxAmountChange = (e) => {
    setMaxAmount(e.target.value);
  };

  const showDeleteConfirmation = (id) => {
    setDeleteConfirmationVisible(true);
    setDeleteId(id);
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleDelete = (id) => {
    (async () => {
      try {
        const res = await incomeServices.deleteIncomeData(id);
        if (res.success) {
          window.location.reload();
          hideDeleteConfirmation();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const resetFilterForm = () => {
    setSelectedCategory("");
    setMinAmount("");
    setMaxAmount("");
    setApplyFilter(false);
    setShowFilter(false);
  };

  return (
    <div className="pt-4 pb-24">
      <div className="bg-white min-w-screen py-4 flex items-center justify-between">
        <h1 className="font-bold text-[32px] text-black ml-8">Income</h1>
        <div className="flex space-x-4 mr-4">
          <button
            className="rounded-full text-white px-8 py-2 bg-main hover:bg-main-hover active:bg-main-active"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </button>
          <button
            className="rounded-full text-white text-[32px] font-thin px-4 text-center bg-main hover:bg-main-hover active:bg-main-active"
            onClick={() => router.push("/income/create")}
          >
            +
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="bg-white mt-6 rounded-xl mx-8 py-8">
          {/* Filter menu content */}
          <div className="grid grid-cols-3 gap-4 mx-10">
            <div>
              <div>
                <label className="font-semibold text-[20px] text-black">Category</label>
                <div className="mt-2">
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    {incomeCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div>
                <label className="font-semibold text-[20px] text-black">Amount</label>
                <div className="flex flex-col gap-y-4 mt-2">
                  <div className="relative">
                    <input
                      type="number"
                      value={minAmount}
                      onChange={handleMinAmountChange}
                      placeholder="Lower Bound"
                      className="input input-bordered w-full pl-10"
                    />
                    <span className="absolute left-3 translate-y-[50%]">Rp</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={maxAmount}
                      onChange={handleMaxAmountChange}
                      placeholder="Upper Bound"
                      className="input input-bordered w-full pl-10"
                    />
                    <span className="absolute left-3 translate-y-[50%]">Rp</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-x-2 mt-auto">
              {/* Apply button */}
              <button
                className="w-150 rounded-full text-white px-4 py-2 bg-main hover-bg-main-hover active-bg-main-active"
                onClick={() => {
                  setApplyFilter(true);
                  setShowFilter(false);
                }}
              >
                Apply
              </button>
              <button
                className="w-150 rounded-full text-main px-4 py-2 outline -main hover-bg-main-hover active-bg-main-active"
                onClick={resetFilterForm}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white mt-6 rounded-md mx-8 overflow-x-auto">
        <table className="table min-w-[900px]">
          <thead className="text-black">
            <tr className="text-sm">
              <th className="grid grid-cols-2">
                <span>Date</span>
                <button onClick={() => toggleSortOrder("date")}>
                  {sortColumn === "date" && sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th>Activity</th>
              <th>Category</th>
              <th className="grid grid-cols-2">
                <span>Amount</span>
                <button onClick={() => toggleSortOrder("amount")}>
                  {sortColumn === "amount" && sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th>Status Penambahan</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedIncomeData.filter(filterIncomeData).map((item, index) => (
              <tr key={index} className="even:bg-white odd:bg-odd-table text-black">
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.incomeName}</td>
                <td>{item.incomeMonthly ? "Bulanan" : "Non Bulanan"}</td>
                <td>Rp{convertNumberToCurrencyFormat(item.incomeAmount)}</td>
                <td>
                  <div
                    className={`rounded-full ${
                      item.autoAdd ? "bg-info" : "bg-main"
                    } text-white w-fit px-4 py-2 font-semibold`}
                  >
                    {item.autoAdd ? "Otomatis" : "Manual"}
                  </div>
                </td>
                <td>
                  <div className="flex flex-row justify-center gap-x-4 items-center">
                    <div>
                      <Link
                        href={{
                          pathname: "/income/edit",
                          query: {
                            id: item._id,
                            name: item.incomeName,
                            monthly: item.incomeMonthly,
                            amount: item.incomeAmount,
                          },
                        }}
                      >
                        <button>
                          <Image width={30} height={30} src="/assets/edit.png" alt="Edit" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <button onClick={() => showDeleteConfirmation(item._id)}>
                        <Image width={30} height={30} src="/assets/trash.png" alt="Delete" />
                      </button>
                    </div>

                    <DeleteConfirmation
                      isOpen={isDeleteConfirmationVisible}
                      hideDeleteConfirmation={hideDeleteConfirmation}
                      handleDelete={() => handleDelete(deleteId)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomePage;
