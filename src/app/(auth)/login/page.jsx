"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import AlertResponse from "@/components/AlertResponse";
import { authServices } from "@/services/auth.services";
import { tokenServices } from "@/services/token.service";
import { useAlertStore } from "@/stores/alert.store";

const LoginPage = () => {
  const router = useRouter();
  const setAlert = useAlertStore((state) => state.setAlert);
  const isLogin = tokenServices.getUserLoginStatus();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isLogin) {
      router.push("/");
      return;
    }
  }, [isLogin]);

  const onSubmit = (data) => {
    (async () => {
      try {
        const res = await authServices.handleUserLogin(data);
        if (res.success) {
          reset();
          tokenServices.setAccessToken(res.data.accessToken);
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        setAlert({
          showAlert: true,
          success: false,
          message: error.message,
        });
      }
    })();
  };

  return (
    <>
      <AlertResponse />
      <div className="grid w-full max-w-[400px]">
        <h1 className="text-center text-2xl font-bold mb-7">Welcome Back</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-[100%]">
            <label className="label">
              <span className="label-text text-base font-medium">Email</span>
            </label>
            <input
              type="text"
              placeholder="enter your email"
              className="input input-bordered focus:outline-black focus:border-none w-full"
              {...register("email", {
                required: "Email cannot be empty",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email ? <ValidationMessage>{errors.email.message}</ValidationMessage> : null}
          </div>
          <div className="form-control w-[100%]">
            <label className="label">
              <span className="label-text text-base font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="enter your password"
              className="input input-bordered focus:outline-black focus:border-none w-full"
              {...register("password", {
                required: "Password cannot be empty",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password ? (
              <ValidationMessage>{errors.password.message}</ValidationMessage>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn bg-main w-full normal-case hover:bg-main/90 text-black font-bold mt-5"
          >
            Login
          </button>
        </form>
        <span className="text-center mt-6 text-sm">
          Don&apos;t have an account? Please&nbsp;
          <Link href="/signup" className="font-bold cursor-pointer">
            Signup
          </Link>
        </span>
      </div>
    </>
  );
};

const ValidationMessage = ({ children }) => {
  return <p className="text-error text-xs mt-2 ml-[1px]">{children}</p>;
};

export default LoginPage;
