"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { goalServices } from "@/services/goal.services";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const EditPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const goalName = searchParams.get("name");
  const goalDescription = searchParams.get("desc");
  const goalPrice = searchParams.get("price");
  const goalStore = searchParams.get("store");

  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    (async () => {
      const patchData = {
        goalName: data.name,
        goalDescription: data.desc,
        goalPrice: data.price,
        goalStore: data.store
      };

      try {
        const res = await goalServices.editgoalData(patchData, id);
        if (res.success) {
          reset();
          router.push("/goal");
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
    <div className="pt-8 pb-24">
      <div className="bg-white py-4 flex items-center">
        <button className="ml-8" onClick={() => router.push("/goal")}>
          <img className="w-6 h-10" src="/assets/back button.png" />
        </button>
        <h1 className="font-bold text-[32px] text-black ml-8">Edit Goal</h1>
      </div>
      <div className="flex items-center justify-center mt-8">
        <div className="p-4 min-w-[50%] max-w-[800px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Price</label>
              <Controller
                name="price"
                control={control}
                defaultValue={goalName}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                    placeholder="eg. 200000"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Add Amount Saving</label>
              <Controller
                name="add amount saving"
                control={control}
                defaultValue={incomeAmount}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                    placeholder="eg: 200000"
                  />
                )}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-full text-white px-4 py-2 bg-main hover:bg-main-hover active:bg-main-active"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
