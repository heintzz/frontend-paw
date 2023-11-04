import { useState } from "react";

const useSorting = (data) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to toggle the sorting order for the selected column
  const toggleSortOrder = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Function to sort data based on the selected column and order
  const sortData = () => {
    if (sortColumn === "date") {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    } else if (sortColumn === "amount") {
      return [...data].sort((a, b) => {
        return sortOrder === "asc"
          ? a.incomeAmount - b.incomeAmount
          : b.incomeAmount - a.incomeAmount;
      });
    }
    return data;
  };

  return [sortOrder, sortColumn, toggleSortOrder, sortData];
};

export default useSorting;
