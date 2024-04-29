"use client";
import { Button, Divider } from "antd";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";

type TForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TForm>();

  const onSubmit = async (data: TForm) => {
    signIn("task", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="lg:p-10 md:p-6 p-2 shadow-xl bg-white max-w-lg my-12 mx-auto">
      <h1 className="text-2xl mb-8 text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 w-full">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full mt-2 p-3 border border-gray-500 rounded-md"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid email",
              },
            })}
          />
          {errors.email?.type === "required" && (
            <span className="label-text-alt text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="label-text-alt text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="mb-4 w-full">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full mt-2 p-3 border border-gray-500 rounded-md"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password should be contains 6 characters",
              },
            })}
          />
          {errors.password?.type === "required" && (
            <span className="label-text-alt text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="label-text-alt text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button type="primary" block size="large" htmlType="submit">
          Login
        </Button>
      </form>
      <p className="text-sm pt-2 font-semibold ">
        New to Task Management?
        <Link className="text-sky-500 underline ml-2" href="/register">
          Create a new account
        </Link>
      </p>
      <Divider plain>or</Divider>
      <Button
        type="primary"
        block
        size="large"
        htmlType="submit"
        className="mb-4 lg:mb-0 flex items-center justify-center gap-2 font-semibold w-full text-black"
        ghost
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/2965/2965278.png"
          sizes="100vw"
          width={30}
          height={30}
          alt="product image"
        />
        <p>Continue With Google</p>
      </Button>
    </div>
  );
};

export default LoginPage;