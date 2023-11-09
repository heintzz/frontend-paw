"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { goalServices } from "@/services/goal.services";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const EditPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const goalPrice = searchParams.get("price");
  const goalAddAmountSaving = searchParams.get("addamountsaving");

  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    (async () => {
      const patchData = {
        goalPrice: data.price,
        goalAddAmountSaving: data.addamountsaving,
      };
      try {
        const res = await goalServices.editGoalData(patchData, id);
        if (res.success) {
          reset();
          router.push("/goal");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

    return (
    <div className="pt-8 relative">
      <div className="bg-white py-4 flex items-center">
        <button className="ml-8" onClick={() => router.push("/goal")}>
          <img className="w-6 h-10" src="/assets/back button.png" />
        </button>
        <h1 className="font-bold text-[32px] text-black ml-8">Edit Goal</h1>
      </div>
      <div className="flex items-center justify-center mt-8">
        <div className="p-4 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Price</label>
              <Controller
                name="price"
                control={control}
                defaultValue={goalPrice}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full py-2 px-4 rounded-md bg-white outline outline-2 mt-2"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Add Amount Saving</label>
              <Controller
                name="add amount saving"
                control={control}
                defaultValue={goalAddAmountSaving}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full py-2 px-4 rounded-md bg-white outline outline-2 mt-2"
                    
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
