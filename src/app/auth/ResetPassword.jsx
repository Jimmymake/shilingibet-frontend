import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Register from "./Register";
import { useForm } from "react-hook-form";
import Loader from "../../component/Loader";
import { BounceLoading } from "respinner";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPasswordAPI, isPending } = useResetPassword();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");

  const { handleSubmit, register } = useForm();

  function submitData(formData) {
    const otp = formData.code;
    const newPassword = formData.password;

    if (!otp || !newPassword || !phone) {
      toast.error("All fields are required");
      return;
    }

    const data = { otp, newPassword, phone };

    resetPasswordAPI(data, {
      onSuccess: (dt) => {
        if (dt?.success === true || dt?.status === true) {
          toast.success(dt?.message || "Password reset successfully");
          navigate("/login");
        } else {
          toast.error(dt?.message || "Failed to reset password");
        }
      },
      onError: (err) => {
        toast.error(err?.message || "Something went wrong");
      },
    });
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-background text-[rgb(151,137,205)]/90">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-1/2 bg-secondary relative px-6 sm:px-12 lg:px-20">
        {/* Header with Logo & Close Button */}
        <div className="flex justify-between items-start pt-6">
          <img src="/logo.png" alt="Logo" className="w-32 sm:w-40" />
          <button onClick={() => navigate(-1)} className=" transition-colors">
            <IoMdClose
              size={28}
              className="bg-[rgb(151,137,205)]/20 rounded-full p-1 text-[rgb(151,137,205)] cursor-pointer"
            />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-grow justify-start max-w-md mx-auto w-full sm:mt-10">
          <h2 className="text-3xl font-bold mt-10 mb-2 text-left">
            Recover your account
          </h2>
          <p className="mb-8 text-sm  text-left">We sent you a recovery code</p>

          {/* Form */}
          <form
            className="space-y-5 w-full"
            onSubmit={handleSubmit(submitData)}
          >
            {/* Recovery Code */}
            <div>
              <label className="block text-sm text-[rgb(151,137,205)]/90 mb-2">
                Recovery Code
              </label>
              <input
                type="tel"
                placeholder="Recovery Code"
                name="code"
                {...register("code", { required: true })}
                className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-sm placeholder-[rgb(151,137,205)]/90 outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>
            {/* New Password */}
            <div>
              <label className="block text-sm text-[rgb(151,137,205)]/90 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "number" : "password"}
                  placeholder="Password"
                  name="password"
                  {...register("password", { required: true })}
                  className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-sm placeholder-[rgb(151,137,205)]/90 outline-none focus:ring-2 focus:ring-primary transition"
                  required
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-3 text-[rgb(151,137,205)]/90  cursor-pointer select-none"
                >
                  {passwordVisible ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </span>
              </div>
            </div>

            {/* Set New Password Button */}
            <button
              type="submit"
              className="w-full bg-primary text-black font-bold py-3 rounded-md shadow-lg cursor-pointer hover:scale-105 transition-all text-center flex justify-center items-center"
            >
              {isPending ? (
                <BounceLoading fill="#000" barHeight={12} />
              ) : (
                "Set New Password"
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div
            onClick={() => navigate("/login")}
            className="mt-6 flex items-center gap-2 text-sm text-primary cursor-pointer hover:underline"
          >
            <IoArrowBack size={16} />
            <span>Back To Login</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-[rgb(151,137,205)]/90 mb-6 text-center mt-auto">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </div>

      {/* Right Section (Image) */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/side.png')",
          backgroundColor: "rgba(0,0,0,0.4)",
          backgroundBlendMode: "overlay",
        }}
      ></div>
    </div>
  );
}
