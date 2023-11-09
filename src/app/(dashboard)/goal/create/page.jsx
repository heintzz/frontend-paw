"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { incomeServices } from "@/services/goal.services";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const { control, handleSubmit, reset, register} = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    (async () => {
      const postData = {
        goalName: data.name,
        goalDescription: data.desc,
        goalPrice: data.price,
        goalStore: data.store,
        goalImage:data.image
      };

      try {
        const res = await goalServices.createGoalData(postData);
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
    <div className="pt-4">
      <div className="bg-white py-4 flex items-center">
        <button className="ml-8" onClick={() => router.push("/goal")}>
          <img className="w-6 h-10" src="/assets/back button.png" />
        </button>
        <h1 className="font-bold text-[32px] text-black ml-8">Create Goal</h1>
      </div>      
        <div className="flex items-center justify-center mt-8">
          <div className="p-4 min-w-[30%] max-w-[800px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                <label className="font-semibold text-[20px] text-black mb-2">Name of Goal</label>
                <Controller
                    name="name of goal"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                        placeholder="goal name"
                    />
                    )}
                />
                </div>
                <div className="mb-4">
                <label className="font-semibold text-[20px] text-black">Description</label>
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                        placeholder="Write desc here"
                    />
                    )}
                />
                </div>
                <div className="mb-4">
                <label className="font-semibold text-[20px] text-black">Price</label>
                <Controller
                    name="price"
                    control={control}
                    defaultValue=""
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
                <div className="mb-4">
                <label className="font-semibold text-[20px] text-black">Store</label>
                <Controller
                    name="store"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                        placeholder="address store/link"
                    />
                    )}
                />
                </div>
                <div className="mb-4">
                <label className="font-semibold text-[20px] text-black">Goal Image</label>
                <div className="flex items-center">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    id="goalImageInput"  
                    {...register("image")}
                  />
                  <label
                    htmlFor="goalImageInput"
                    className="cursor-pointer p-2 border border-gray-300 rounded-md ml-2"
                  >
                    Choose Image
                  </label>
                </div>
              </div>
                <div className="text-center">
                <button
                    type="submit"
                    className="rounded-full text-white px-8 py-2 bg-main hover:bg-main-hover active:bg-main-active"
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


