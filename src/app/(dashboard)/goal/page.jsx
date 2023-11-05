"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useSorting from "@/app/hooks/useSorting";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { formatDate } from "@/helpers/helper";
import { goalServices } from "@/services/goal.services";
import { convertNumberToCurrencyFormat } from "@/helpers/helper";

const GoalPage = () => {
  const router = useRouter();

  const [GoalData, setGoalData] = useState([]);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);


  useEffect(() => {
    // Fetch goal data and update the state
    goalServices
      .getGoalData()
      .then((data) => {
        setGoalData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching goal data:", error);
      });
  }, []);

  const showDeleteConfirmation = () => {
    setDeleteConfirmationVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleDelete = (id) => {
    (async () => {
      try {
        const res = await goalServices.deleteGoalData(id);
        if (res.success) {
          window.location.reload();
          hideDeleteConfirmation();
          u;
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return <h1>Goal Page</h1>;
};

export default GoalPage;
