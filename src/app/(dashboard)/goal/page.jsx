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

const GoalPage = () => {
  const router = useRouter();

  const [GoalsData, setGoalsData] = useState([]);

  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  return <h1>Goal Page</h1>;
};

export default GoalPage;
