"use client";

import ValidationMessage from "@/components/ValidationMessage";
import { goalServices } from "@/services/goal.services";
import { useAlertStore } from "@/stores/alert.store";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const EditPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const goalPrice = searchParams.get("price");
  const goalName = searchParams.get("name");
  const goalDescription = searchParams.get("desc");
  const goalStore = searchParams.get("store");

  const setAlert = useAlertStore((state) => state.setAlert);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    (async () => {
      const patchData = {
        goalPrice: data.price,
        goalName: data.name,
        goalDescription: data.desc,
        goalStore: data.store,
      };
      try {
        const res = await goalServices.editGoalData(patchData, id);
        if (res.success) {
          reset();
          router.push("/goal");
          setAlert({
            showAlert: true,
            success: true,
            message: "Goal edited successfully",
          });
        }
      } catch (error) {
        setAlert({
          showAlert: true,
          success: true,
          message: error,
        });
      }
    })();
  };

  return (
    <div className="pt-4">
      <div className="bg-white py-4 flex items-center">
        <button className="ml-8" onClick={() => router.push("/goal")}>
          <MdOutlineArrowBackIosNew size="1.90em" fill="Black" />
        </button>
        <h1 className="font-bold text-[32px] text-black ml-8">Edit Goal</h1>
      </div>
      <div className="flex items-center justify-center mt-8">
        <div className="p-4 w-[400px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Name of Goal</label>
              <Controller
                name="name"
                control={control}
                defaultValue={goalName}
                rules={{ required: "Name cannot be empty" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                  />
                )}
              />
              {errors.name ? <ValidationMessage>{errors.name.message}</ValidationMessage> : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Description</label>
              <Controller
                name="desc"
                control={control}
                defaultValue={goalDescription}
                rules={{ required: "Description cannot be empty" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                  />
                )}
              />
              {errors.desc ? <ValidationMessage>{errors.desc.message}</ValidationMessage> : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Price</label>
              <Controller
                name="price"
                control={control}
                defaultValue={goalPrice}
                rules={{
                  required: "Price cannot be empty",
                  validate: (value) => {
                    return !value.includes("-") || "Please enter a non negative value";
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                  />
                )}
              />
              {errors.price ? <ValidationMessage>{errors.price.message}</ValidationMessage> : null}
            </div>
            <div className="mb-4">
              <label className="font-semibold text-[20px] text-black">Store</label>
              <Controller
                name="store"
                control={control}
                defaultValue={goalStore}
                rules={{ required: "Store cannot be empty" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="input input-bordered focus:outline-black focus:border-none w-full mt-2"
                  />
                )}
              />
              {errors.store ? <ValidationMessage>{errors.store.message}</ValidationMessage> : null}
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
