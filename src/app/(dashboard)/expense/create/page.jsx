"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { expenseServices } from "@/services/expense.services";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/stores/alert.store";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import ValidationMessage from "@/components/ValidationMessage";

const CreatePage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isMonthly, setIsMonthly] = useState(false);
  const router = useRouter();

  const setAlert = useAlertStore((state) => state.setAlert);

  const categories = [
    "Education",
    "Food & Beverage",
    "Utilities",
    "Subscription",
    "Holiday",
    "Transportation",
    "Others",
  ];

  const onSubmit = (data) => {
    (async () => {
      const postData = {
        expenseName: data.activity,
        expenseAmount: data.amount,
        expenseCategory: data.category,
        expenseMonthly: isMonthly,
      };

      try {
        const res = await expenseServices.createExpenseData(postData);
        if (res.success) {
          reset();
          router.push("/expense");
          setAlert({
            showAlert: true,
            success: true,
            message: "Expense created successfully",
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const handleMonthlyToggle = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <div className="pt-4 pb-24">
      <div className="bg-white py-4 flex items-center">
        <button className="ml-8" onClick={() => router.push("/expense")}>
          <MdOutlineArrowBackIosNew size="1.90em" fill="Black" />
        </button>
        <h1 className="font-bold text-[32px] text-black ml-8">Create Expense</h1>
      </div>
      <div className="flex items-center justify-center mt-8">
        <div className="p-4 w-[400px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Activity</label>
              <Controller
                name="activity"
                control={control}
                rules={{ required: "Activity name cannot be empty" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                    placeholder="Expense name"
                  />
                )}
              />
              {errors?.activity ? (
                <ValidationMessage>{errors.activity.message}</ValidationMessage>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Category</label>
              <Controller
                name="category"
                control={control}
                defaultValue="Education"
                render={({ field }) => (
                  <select
                    {...field}
                    className="select select-bordered focus:outline-black focus:border-none w-full mt-2"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors?.category ? (
                <ValidationMessage>{errors.category.message}</ValidationMessage>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Amount</label>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: "Expense amount cannot be empty",
                  validate: (value) => {
                    return !value.includes("-") || "Please enter a non negative value";
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                    placeholder="eg: 200000"
                  />
                )}
              />
              {errors?.amount ? (
                <ValidationMessage>{errors.amount.message}</ValidationMessage>
              ) : null}
            </div>
            <div className="mb-1 flex items-center">
              <label className="font-semibold text-[20px] text-black mr-4">Monthly</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  value={isMonthly}
                  onChange={handleMonthlyToggle}
                />
                <div
                  className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer ${
                    isMonthly
                      ? "peer-checked:after:translate-x-full peer-checked:after:border-white"
                      : ""
                  } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black`}
                ></div>
              </label>
            </div>
            <div className="text-black text-sm mb-10">*set as a monthly expense</div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-full text-white px-4 py-2 bg-main hover:bg-main-hover active:bg-main-active"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
