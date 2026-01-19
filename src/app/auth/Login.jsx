import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogIn } from "../../hooks/useAuth";
// import Loader from "../../component/Loader";
import toast from "react-hot-toast";
import { BounceLoading } from "respinner";
import { useBanner } from "../../context/BannerContext";


export default function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { showBanner } = useBanner();
  const { handleSubmit, register } = useForm();
  const { logInFn, isLoading } = useLogIn();
  function submitData(data) {
    const phone = data.phone;
    logInFn(
      { ...data, phone },
      {
        onSuccess: (data) => {
          if (!data?.user) {
            return;
          }
          const userData = {
            token: data.token,
            ...data.user,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          toast.success(data?.message || "Log in successful");
          // ✅ Trigger banner if API sends one
          if (data?.banner?.showBanner) {
            showBanner(data.banner.currentBanner);
          }
          navigate("/");
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      }
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-background text-[rgb(151,137,205)]/90">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-1/2 bg-secondary relative px-6 sm:px-12 lg:px-20">
        {/* Header with Logo & Close Button */}
        <div className="flex justify-between items-start pt-6">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="w-32 sm:w-40" />
          </Link>
          <button onClick={() => navigate(-1)} className=" transition-colors">
            <IoMdClose
              size={28}
              className="bg-[rgb(151,137,205)]/20 rounded-full p-1 text-[rgb(151,137,205)] cursor-pointer"
            />
          </button>
        </div>

        {/* Body (Centered Content) */}
        <div className="flex flex-col flex-grow justify-start max-w-md mx-auto w-full sm:mt-10">
          <h2 className="text-3xl font-bold mt-10 mb-2 text-left sm:text-left">
            Login to your account
          </h2>
          <p className="mb-8 text-sm  text-left sm:text-left">
            Don’t have an account?{" "}
            <Link to="/register">
              <span className="text-primary cursor-pointer hover:underline">
                Register
              </span>
            </Link>
          </p>
          {/* Form */}
          <form
            onSubmit={handleSubmit(submitData)}
            className="space-y-5 w-full"
          >
            {/* Phone Number */}
            <div>
              <label className="block text-sm  mb-1">Phone Number</label>
              <input
                type="tel"
                inputMode="tel"
                name="phone"
                placeholder="0700 000 000"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-sm placeholder-[rgb(151,137,205)]/90 outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm  mb-1">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  {...register("password", { required: true })}
                  className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-sm placeholder-[rgb(151,137,205)]/90 outline-none  transition"
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-3   cursor-pointer select-none"
                >
                  {passwordVisible ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </span>
              </div>
            </div>
            <Link to="/forgot-password">
              <div className="text-sm text-primary cursor-pointer hover:underline text-left mb-4">
                Forgot Password?
              </div>
            </Link>

            {/* Play Now Button */}

            <button
              type="submit"
              className="w-full bg-primary text-black font-bold py-3 rounded-md shadow-lg hover:shadow-yellow-500/40 hover:scale-105 transition-all text-center flex justify-center items-center"
            >
              {isLoading ? (
                <BounceLoading fill="#000" barHeight={12} />
              ) : (
                "Play now"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mb-6 text-center mt-auto">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </div>

      {/* Right Section (Image) */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/side.png')" }}
      ></div>
    </div>
  );
}
