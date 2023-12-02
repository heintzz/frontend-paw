"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { goalServices } from "@/services/goal.services";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ValidationMessage from "@/components/ValidationMessage";
import { useAlertStore } from "@/stores/alert.store";

const CreatePage = () => {
  const {
    handleSubmit,
    reset,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [image, setImage] = useState();

  const setAlert = useAlertStore((state) => state.setAlert);

  const uploadImage = (e) => {
    let reader = new FileReader();
    if (e.target?.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
      };
      return;
    }
  };

  useEffect(() => {
    if (image) {
      clearErrors("image");
    }
  }, [image]);

  const onSubmit = (data) => {
    if (!image) {
      setError("image", {
        type: "required",
        message: "Image cannot be empty",
      });
      return;
    }

    const postData = {
      ...data,
      image: image,
    };

    (async () => {
      try {
        const res = await goalServices.createGoalData(postData);
        if (res.success) {
          reset();
          router.push("/goal");
          setAlert({
            showAlert: true,
            success: true,
            message: "Goal created successfully",
          });
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
      <div className="grid grid-cols-3 mt-8">
        <div className="pt-4 justify-self-center">
          {image && (
            <Image
              src={image}
              alt="image preview"
              className="min-w-[80%] max-w-[400px]"
              width={500}
              height={500}
            />
          )}
        </div>
        <div className="p-4 min-w-[30%] max-w-[800px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black mb-2">
                Name of Goal
              </label>
              <input
                type="text"
                className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                {...register("name", {
                  required: "Name cannot be empty",
                })}
              />
              {errors.name ? (
                <ValidationMessage>{errors.name.message}</ValidationMessage>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">
                Description
              </label>
              <input
                type="text"
                className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                {...register("desc", {
                  required: "Description cannot be empty",
                })}
              />
              {errors.desc ? (
                <ValidationMessage>{errors.desc.message}</ValidationMessage>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">
                Price
              </label>
              <input
                type="number"
                className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                {...register("price", {
                  required: "Price cannot be empty",
                })}
              />
              {errors.price ? (
                <ValidationMessage>{errors.price.message}</ValidationMessage>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">
                Store
              </label>
              <input
                type="text"
                className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                placeholder="http://example.com"
                aria-invalid={errors.store ? "true" : "false"}
                {...register("store", {
                  required: "Store cannot be empty",
                })}
              />
              {errors.store ? (
                <ValidationMessage>{errors.store.message}</ValidationMessage>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">
                Goal Image
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  id="goalImage"
                  onChange={uploadImage}
                />
                <label
                  htmlFor="goalImage"
                  className="cursor-pointer text-sm p-2 border border-gray-300 rounded-md"
                >
                  Choose image
                </label>
              </div>
              {errors.image ? (
                <ValidationMessage>{errors.image.message}</ValidationMessage>
              ) : null}
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
