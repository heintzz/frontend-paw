"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { goalServices } from "@/services/goal.services";
import { convertNumberToCurrencyFormat } from "@/helpers/helper";
import { useAlertStore } from "@/stores/alert.store";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Fragment } from "react";
import Modal from "@/components/Modal";
import AlertResponse from "@/components/AlertResponse";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import Link from "next/link";

const GoalPage = () => {
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [goalData, setGoalData] = useState([]);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const setAlert = useAlertStore((state) => state.setAlert);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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

  const [showModal, setShowModal] = useState(false);
  const savingsAmount = searchParams.get("amount");
  const onSubmit = (data) => {
    (async () => {
      const patchData = {
        savingsAmount: data.amount,
      };
      try {
        const res = await goalServices.editGoalData(patchData, id);
        if (res.success) {
          reset();
          router.push("/goal");
          setAlert({
            showAlert: true,
            success: true,
            message: "add saving amount successfully",
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <div className="pt-4 pb-8 lg:pb-24">
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
              className="bg-white mt-4 lg:mt-10 mb-4 lg:mb-10 rounded-xl mx-2 sm:mx-4 lg:mx-8 py-4 lg:py-8 flex flex-col sm:flex-row items-center justify-between"
            >
              <div
                key={goal._id}
                className="flex flex-col items-center sm:flex-row sm:items-start mx-2 sm:mx-4 lg:mx-10 my-2 lg:my-0"
              >
                <Image
                  src={goal.goalImage}
                  alt="Goal"
                  width={100}
                  height={100}
                  className="rounded-full sm:mr-4 lg:mr-8 mb-4 sm:mb-0"
                />
                <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 text-center sm:text-left">
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
                    <div>
                      <Fragment>
                        <button
                          className="bg-main rounded-full p-2"
                          onClick={() => setShowModal(true)}
                        >
                          <FaPlus size="1.45em" fill="white" />
                        </button>
                        <Modal
                          isVisible={showModal}
                          onClose={() => setShowModal(false)}
                        >
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <h3
                              className="text-xl font-semibold text-black-900 mb-5"
                              style={{ textAlign: "center" }}
                            >
                              Add Saving Amount
                            </h3>
                            <div className="mb-4">
                              <Controller
                                name="amount"
                                control={control}
                                defaultValue={savingsAmount}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="number"
                                    className="w-full py-2 px-2 rounded-md bg-white outline outline-1 mt-2"
                                  />
                                )}
                              />
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
                      </Fragment>
                    </div>
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
