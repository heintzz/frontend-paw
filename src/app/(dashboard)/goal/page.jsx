"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AlertResponse from "@/components/AlertResponse";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { goalServices } from "@/services/goal.services";
import { convertNumberToCurrencyFormat } from "@/helpers/helper";
import { useAlertStore } from "@/stores/alert.store";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const GoalPage = () => {
  const router = useRouter();

  const [goalData, setGoalData] = useState([]);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const setAlert = useAlertStore((state) => state.setAlert);

  useEffect(() => {
    // Fetch goal data and update the state
    goalServices
      .getGoalData()
      .then((res) => {
        setGoalData(res.data);
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
          setAlert({
            showAlert: true,
            success: true,
            message: "Goal deleted successfully",
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <div className="pt-4 pb-24 lg:pb-24">
      <AlertResponse />
      <div className="bg-white min-w-screen py-4 flex items-center justify-between">
        <h1 className="font-bold text-[32px] text-black ml-8">Goal</h1>
        <div className="flex space-x-4 mr-20">
          <button
            className="rounded-full text-white px-8 py-2 bg-main hover:bg-main-hover active:bg-main-active "
            onClick={() => router.push("/goal/create")}
          >
            Create
          </button>
        </div>
      </div>

      <div>
        {goalData.map((goal) => {
          const percentage = Math.round(
            (goal.savingsAmount / goal.goalPrice) * 100
          );
          const heightOfCompletion =
            percentage === 100 ? "h-full rounded-[10px]" : "rounded-b-[10px]";
          return (
            <div
              key={goal._id}
              className="bg-white mt-4 lg:mt-10 mb-4 lg:mb-10 rounded-xl mx-4 lg:mx-20 py-4 lg:py-10 flex flex-col lg:flex-row items-center justify-between"
            >
              <div
                key={goal._id}
                className="flex flex-col items-center lg:flex-row lg:items-start mx-4 lg:mx-10 my-2 lg:my-0"
              >
                <Image
                  src={goal.goalImage}
                  alt="Goal"
                  width={100}
                  height={100}
                />
                <div className="ml-0 lg:ml-10 mt-4 lg:mt-0 text-center lg:text-left">
                  <h1 className="font-bold text-[30px] text-black">
                    {goal.goalName}
                  </h1>
                  <p className="text-lg font-semibold">Description</p>
                  <span className="text-[15px] text-black">
                    {goal.goalDescription}
                  </span>
                  <p className="text-lg font-semibold">Store</p>
                  <Link href={goal.goalStore} className="text-black underline">
                    {goal.goalStore}
                  </Link>
                  <p className="text-lg font-semibold">Price</p>
                  <span className="text-main font-bold">
                    Rp{convertNumberToCurrencyFormat(goal.goalPrice)}
                  </span>
                </div>
              </div>
              <div className="mr-20">
                <h1 className="font-bold mb-5">
                  <p>Saving Amount</p>
                  <span className="text-main">
                    Rp
                    {convertNumberToCurrencyFormat(goal.savingsAmount)}
                  </span>
                </h1>
                <div className="flex">
                  <div className="font-bold relative text-[40px] grid w-32 h-32 border-main border-2 rounded-xl place-items-center">
                    <div
                      className={`bg-green-200 absolute ${heightOfCompletion} w-full bottom-0`}
                      style={{ height: `${percentage}%` }}
                    ></div>
                    <span className="text-black">{percentage}%</span>
                  </div>
                  <div className="flex flex-col justify-between ml-4">
                    <button className="bg-main rounded-full p-2">
                      <FaPlus size="1.45em" fill="white" />
                    </button>
                    <button className="bg-info rounded-full p-2">
                      <MdModeEdit size="1.45em" fill="white" />
                    </button>
                    <button
                      onClick={showDeleteConfirmation}
                      className="bg-error rounded-full p-2"
                    >
                      <MdDeleteForever size="1.45em" fill="white" />
                    </button>
                  </div>
                </div>
                <DeleteConfirmation
                  isOpen={isDeleteConfirmationVisible}
                  hideDeleteConfirmation={hideDeleteConfirmation}
                  handleDelete={() => handleDelete(goal._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalPage;
