"use client";

import React, { useState , useEffect } from "react";
import { incomeServices } from "@/services/income.services";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { useRouter } from "next/navigation";
import Link from "next/link";

const IncomePage = () => {
  function formatDate(inputDate) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

  const router = useRouter();

  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    // Fetch income data and update the state
    incomeServices.getIncomeData() 
      .then((data) => {
        setIncomeData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching income data:', error);
      });
  }, []);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleMinAmountChange = (event) => {
    setMinAmount(event.target.value);
  };

  const handleMaxAmountChange = (event) => {
    setMaxAmount(event.target.value);
  };

  const filterIncomeData = (item) => {
    if (!applyFilter) return true; 
  
    if (selectedCategory && (item.incomeMonthly ? 'Bulanan' : 'Non Bulanan') !== selectedCategory) {
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

  const categories = [
    "Bulanan",
    "Non Bulanan",
  ];

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // Function to toggle the sorting order for the selected column
  const toggleSortOrder = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Function to sort income data based on the selected column and order
  const sortIncomeData = () => {
    if (sortColumn === 'date') {
      return [...incomeData].sort((a, b) => {
        return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sortColumn === 'amount') {
      return [...incomeData].sort((a, b) => {
        return sortOrder === 'asc' ? a.incomeAmount - b.incomeAmount : b.incomeAmount - a.incomeAmount;
      });
    }
    return incomeData;
  };

  const sortedIncomeData = sortIncomeData();

  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  const showDeleteConfirmation = () => {
    setDeleteConfirmationVisible(true);
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

  return (
    <div className="pt-8 relative">
      <div className="bg-white min-w-screen py-4 flex items-center justify-between">
        <h1 className="font-sans font-bold text-[32px] text-black ml-8">Income</h1>
        <div className="flex space-x-4 mr-4">
          <button
            className="rounded-full text-white px-8 py-2 bg-[#4C9C66] hover:bg-[#3A7F50] active:bg-[#2A613C]"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </button>
          <button
            className="rounded-full text-white text-[32px] font-thin px-4 text-center bg-[#4C9C66] hover:bg-[#3A7F50] active:bg-[#2A613C]"
            onClick={() => router.push("/income/create")}
          >
            +
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="bg-white p-4 mt-12 rounded-xl mx-8 py-8 relative">
          {/* Filter menu content */}
          <div className="grid grid-cols-3 gap-4 mx-10">
            <div>
              {/* Category dropdown */}
              <div>
                <label className="font-sans font-semibold text-[20px] text-black">Category</label>
                <div className="mt-2">
                  <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="pl-4 pr-[80px] py-1 rounded-md bg-white outline outline-2"
                    >
                    <option disabled selected>Select a category</option>
                    {categories.map((category) => (
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
                <label className="font-sans font-semibold text-[20px] text-black">Amount</label>
                <div className="flex flex-col space-y-2 mt-2 gap-2">
                  <div className="flex flex-row gap-4 bg-white outline outline-2 rounded-md w-full py-1">
                    <div className="text-black ml-4">Rp</div>
                    <input
                      type="number"
                      value={minAmount}
                      onChange={handleMinAmountChange}
                      placeholder="Lower Bound"
                      className="bg-transparent flex flex-grow mr-4 w-full"
                    />
                  </div>
                  <div className="flex flex-row gap-4 bg-white outline outline-2 rounded-md py-1">
                    <div className="text-black ml-4">Rp</div>
                    <input
                      type="number"
                      value={maxAmount}
                      onChange={handleMaxAmountChange}
                      placeholder="Upper Bound"
                      className="bg-transparent flex flex-grow mr-4 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Apply button */}
              <button
                className="w-150 ml-[100px] mt-8 rounded-full text-white px-4 py-2 bg-[#4C9C66] hover-bg-[#3A7F50] active-bg-[#2A613C]"
                onClick={() => {
                  setApplyFilter(true); 
                  setShowFilter(false);
                }}
              >
                Apply
              </button>
              <button
                className="w-150 ml-[100px] mt-2 rounded-full text-white px-4 py-2 bg-[#4C9C66] hover-bg-[#3A7F50] active-bg-[#2A613C]"
                onClick={() => {
                  setSelectedCategory("");
                  setMinAmount("");
                  setMaxAmount("");
                  setApplyFilter(false); 
                  setShowFilter(false);
                }}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white mt-6 rounded-md mx-8 relative">
        <table className="table">
          <thead className="text-black">
            <tr>
              <th className="grid grid-cols-2">
                <span>Date</span>
                <button onClick={() => toggleSortOrder('date')}>
                  {sortColumn === 'date' && sortOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
              <th>Activity</th>
              <th>Category</th>
              <th className="grid grid-cols-2">
                <span>Amount</span>
                <button onClick={() => toggleSortOrder('amount')}>
                  {sortColumn === 'amount' && sortOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedIncomeData
            .filter(filterIncomeData)
            .map((item, index) => (
              <tr key={index} className='even:bg-white, odd:bg-[#F7F6FE] text-black'>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.incomeName}</td>
                <td>
                  {item.incomeMonthly ? 'Bulanan':'Non Bulanan'}
                </td>
                <td>{item.incomeAmount}</td>
                <td>
                  <div className={`rounded-full ${item.autoAdd ? 'bg-[#EBF9F1]' :'bg-[#FF0000]' } text-white w-fit px-2 py-1 font-sans`}>
                    {item.autoAdd ? 'Ditambahkan Otomatis' : 'Ditambahkan Manual'}
                  </div>
                </td>
                <td>
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      <Link
                        href={{
                          pathname: "/income/edit",
                          query: {
                            id: item._id,
                            name: item.incomeName,
                            monthly: item.incomeMonthly,
                            amount: item.incomeAmount,
                          }
                        }}
                      >
                        <button className="hover:bg-[#c0c0c0] active:bg-[#474747]">
                          <img className="w-6 h-6" src="/assets/edit.png" alt="Edit" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <button className="hover:bg-[#c0c0c0] active-bg-[#474747]" onClick={showDeleteConfirmation}>
                        <img className="w-6 h-6" src="/assets/trash.png" alt="Delete" />
                      </button>
                    </div>
                    
                    <DeleteConfirmation
                      isOpen={isDeleteConfirmationVisible}
                      hideDeleteConfirmation={hideDeleteConfirmation}
                      handleDelete={() => handleDelete(item._id)}
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