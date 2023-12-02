"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AlertResponse from "@/components/AlertResponse";
import useSorting from "@/app/hooks/useSorting";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { expenseCategories } from "@/enums/category.enum";
import { formatDate } from "@/helpers/helper";
import { expenseServices } from "@/services/expense.services";
import { convertNumberToCurrencyFormat } from "@/helpers/helper";
import { useAlertStore } from "@/stores/alert.store";

const ExpensePage = () => {
  const router = useRouter();

  const [expenseData, setExpenseData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const setAlert = useAlertStore((state) => state.setAlert);

  const [sortOrder, sortColumn, toggleSortOrder, sortData] = useSorting(
    expenseData,
    "expenseAmount"
  );
  const sortedExpenseData = sortData();

  useEffect(() => {
    // Fetch expense data and update the state
    fetchExpenseData();
  }, []);

  const fetchExpenseData = () =>{
    // Fetch expense data and update the state
    expenseServices
      .getExpenseData()
      .then((data) => {
        setExpenseData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching expense data:", error);
      });
  };

  const filterExpenseData = (item) => {
    if (!applyFilter) return true;

    if (selectedCategory && item.expenseCategory != selectedCategory) {
      return false;
    }
    if (minAmount && item.expenseAmount < minAmount) {
      return false;
    }
    if (maxAmount && item.expenseAmount > maxAmount) {
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
        const res = await expenseServices.deleteExpenseData(id);
        if (res.success) {
          fetchExpenseData();
          hideDeleteConfirmation();
          setAlert({
            showAlert: true,
            success: true,
            message: "Expense deleted successfully",
          });
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
      <AlertResponse/>
      <div className="bg-white min-w-screen py-4 flex items-center justify-between">
        <h1 className="font-bold text-[32px] text-black ml-8">Expense</h1>
        <div className="flex space-x-4 mr-4">
          <button
            className="rounded-full text-white px-8 py-2 bg-main hover:bg-main-hover active:bg-main-active"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </button>
          <button
            className="rounded-full text-white text-[32px] font-thin px-4 text-center bg-main hover:bg-main-hover active:bg-main-active"
            onClick={() => router.push("/expense/create")}
          >
            +
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="bg-white p-4 mt-12 rounded-xl mx-8 py-8">
          {/* Filter menu content */}
          <div className="grid grid-cols-3 gap-4 mx-10">
            <div>
              {/* Category dropdown */}
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
                    {expenseCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              {/* Amount input fields */}
              <div>
                <label className="font-semibold text-[20px] text-black">Amount</label>
                <div className="flex flex-col space-y-2 mt-2 gap-2">
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
                className="w-150 rounded-full text-white px-4 py-2 bg-main hover:bg-main-hover"
                onClick={() => {
                  setApplyFilter(true);
                  setShowFilter(false);
                }}
              >
                Apply
              </button>
              <button
                className="w-150 rounded-full text-main px-4 py-2 outline outline-1 outline-main"
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
            {sortedExpenseData.filter(filterExpenseData).map((item, index) => (
              <tr key={index} className="even:bg-white odd:bg-odd-table text-black">
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.expenseName}</td>
                <td>{item.expenseCategory}</td>
                <td>Rp{convertNumberToCurrencyFormat(item.expenseAmount)}</td>
                <td>
                  <div
                    className={`rounded-full ${
                      item.autoAdd ? "bg-info" : "bg-main"
                    } text-white w-fit px-4 py-1 font-semibold`}
                  >
                    {item.autoAdd ? "Otomatis" : "Manual"}
                  </div>
                </td>
                <td>
                  <div className="flex flex-row justify-center gap-x-4 items-center">
                    <div>
                      <Link
                        href={{
                          pathname: "/expense/edit",
                          query: {
                            id: item._id,
                            name: item.expenseName,
                            monthly: item.expenseMonthly,
                            amount: item.expenseAmount,
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

export default ExpensePage;
