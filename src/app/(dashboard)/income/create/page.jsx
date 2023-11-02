"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {incomeServices} from "@/services/income.services"
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const { control, handleSubmit, reset } = useForm();
  const [isMonthly, setIsMonthly] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    (async () => {
    // Prepare the data object
    const postData = {
      incomeName: data.activity,
      incomeAmount: data.amount,
      incomeMonthly: isMonthly,
    };

      try {
        const res = await incomeServices.createIncomeData(postData);
        if (res.success) {
          reset();
          router.push("/income");
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
    <div className="pt-8 relative">
      <div className="bg-white py-4 flex items-center">
        <button className="hover:bg-[#c0c0c0] active:bg-[#474747] ml-8" onClick={()=>router.push("/income")}>
          <img className="w-6 h-10" src="/assets/back button.png" />
        </button>
        <h1 className="font-sans font-bold text-[32px] text-black ml-8">Create Income</h1>
      </div>
      <div className="flex items-center justify-center mt-8">
        <div className="p-4 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="font-sans font-semibold text-[20px] text-black">
                Activity
              </label>
              <Controller
                name="activity"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full py-2 px-4 rounded-md bg-white outline outline-2 mt-2"
                    placeholder="Income name"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label className="font-sans font-semibold text-[20px] text-black">
                Category
              </label>
              <Controller
                name="category"
                control={control}
                defaultValue="Bulanan"
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full py-2 px-4 rounded-md bg-white outline outline-2 mt-2"
                  >
                    <option value="Bulanan">Bulanan</option>
                    <option value="Non Bulanan">Non Bulanan</option>
                  </select>
                )}
              />
            </div>
            <div className="mb-4">
              <label className="font-sans font-semibold text-[20px] text-black">
                Amount
              </label>
              <Controller
                name="amount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full py-2 px-4 rounded-md bg-white outline outline-2 mt-2"
                    placeholder="eg: 200000"
                  />
                )}
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="font-sans font-semibold text-[20px] text-black mr-4">
                Monthly
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  value={isMonthly}
                  onChange={handleMonthlyToggle}
                />
                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer ${isMonthly ? 'peer-checked:after:translate-x-full peer-checked:after:border-white' : ''} after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black`}></div>
              </label>
            </div>
            <div className="text-black text-sm mb-6">
                *set as a monthly income
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-full text-white px-4 py-2 bg-[#4C9C66] hover:bg-[#3A7F50] active:bg-[#2A613C]"
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