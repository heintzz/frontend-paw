"use client";

import AlertResponse from "@/components/AlertResponse";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import Modal from "@/components/Modal";
import ValidationMessage from "@/components/ValidationMessage";
import { convertNumberToCurrencyFormat } from "@/helpers/helper";
import { goalServices } from "@/services/goal.services";
import { useAlertStore } from "@/stores/alert.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

const GoalPage = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [goalData, setGoalData] = useState([]);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const setAlert = useAlertStore((state) => state.setAlert);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  useEffect(() => {
    goalServices
      .getGoalData()
      .then((res) => {
        setGoalData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching goal data:", error);
      });
  }, [triggerRefetch]);

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
          setTriggerRefetch((prev) => !prev);
          hideDeleteConfirmation();
          setAlert({
            showAlert: true,
            success: true,
            message: "Goal deleted successfully",
          });
        }
      } catch (error) {
        hideDeleteConfirmation();
        setAlert({
          showAlert: true,
          success: false,
          message: error,
        });
      }
    })();
  };

  const openAddSavingAmount = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const onSubmit = (data) => {
    (async () => {
      try {
        const res = await goalServices.editGoalData(data, editId);
        if (res.success) {
          reset();
          router.push("/goal");
          setTriggerRefetch((prev) => !prev);
          setAlert({
            showAlert: true,
            success: true,
            message: "Add saving amount successfully",
          });
          setShowModal(false);
        }
      } catch (error) {
        setShowModal(false);
        setAlert({
          showAlert: true,
          success: false,
          message: error.message,
        });
        console.error(error);
      }
    })();
  };

  return (
    <div className="pt-4 pb-8 lg:pb-24">
      <AlertResponse />
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl text-center font-semibold mb-5">Add Saving Amount</h3>
          <div className="mb-4">
            <input
              type="number"
              className="input input-bordered focus:outline-black focus:border-none w-full"
              {...register("savingsAmount", {
                required: "Saving amount cannot be empty",
                valueAsNumber: true,
              })}
            />
            {errors?.savingsAmount ? (
              <ValidationMessage>{errors?.savingsAmount.message}</ValidationMessage>
            ) : null}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="rounded-full text-white px-4 py-2 bg-main hover:bg-main-hover active:bg-main-active"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
      <div className="bg-white min-w-screen py-4 px-8 flex items-center justify-between">
        <h1 className="font-bold text-[32px] text-black">Goal</h1>
        <button
          className="rounded-full w-12 h-12 text-white text-[32px] font-thin text-center bg-main hover:bg-main-hover active:bg-main-active"
          onClick={() => router.push("/goal/create")}
        >
          +
        </button>
      </div>
      <div>
        {goalData.map((goal) => {
          let percentage = Math.round((goal.savingsAmount / goal.goalPrice) * 100);
          const maxPercentage = 100;
          percentage = percentage > maxPercentage ? maxPercentage : percentage;
          const heightOfCompletion =
            percentage === 100 ? "h-full rounded-[10px]" : "rounded-b-[10px]";

          return (
            <div
              key={goal._id}
              className="bg-white mt-4 lg:mt-10 mb-4 sm:pr-10 px-5 lg:mb-10 rounded-xl mx-4 lg:mx-8 py-4 lg:py-8 flex flex-col sm:px sm:flex-row sm:justify-between"
            >
              <div
                key={goal._id}
                className="flex flex-col sm:flex-row sm:items-start mr-2 sm:mr-4 lg:mr-10 my-2 lg:my-0"
              >
                <Image
                  src={goal.goalImage}
                  alt="Goal"
                  width={100}
                  height={100}
                  className="rounded-full hidden sm:block sm:mr-4 lg:mr-8 mb-4 sm:mb-0"
                />
                <div className="ml-0 sm:ml-4 text-left">
                  <h1 className="font-bold text-[30px] text-black">{goal.goalName}</h1>
                  <p className="text-lg font-semibold">Description</p>
                  <span className="text-[15px] text-black">{goal.goalDescription}</span>
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
              <div>
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
                      className={`bg-green-200 ${heightOfCompletion} w-full bottom-0 ${
                        percentage < 7 ? "hidden" : "absolute"
                      }`}
                      style={{ height: `${percentage}%` }}
                    ></div>
                    <p className="text-black relative z-[1]">{percentage}%</p>
                  </div>
                  <div className="flex flex-col justify-between ml-4">
                    <button
                      className="bg-main rounded-full p-2"
                      onClick={() => openAddSavingAmount(goal._id)}
                    >
                      <FaPlus size="1.45em" fill="white" />
                    </button>
                    <Link
                      href={{
                        pathname: "/goal/Edit",
                        query: {
                          id: goal._id,
                          name: goal.goalName,
                          desc: goal.goalDescription,
                          store: goal.goalStore,
                          price: goal.goalPrice,
                        },
                      }}
                    >
                      <button className="bg-info rounded-full p-2">
                        <MdModeEdit size="1.45em" fill="white" />
                      </button>
                    </Link>
                    <button onClick={showDeleteConfirmation} className="bg-error rounded-full p-2">
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
