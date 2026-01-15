import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../hooks/useAuth";
import Loader from "../../component/Loader";
import { BounceLoading } from "respinner";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { forgotPasswordAPI, isPending: isLoading } = useForgotPassword();

  const { handleSubmit, register } = useForm();

  function submitData(data) {
    forgotPasswordAPI(data, {
      onSuccess: (dt) => {
        navigate(`/reset?phone=${data.phone}`);
        toast.success(dt?.message);
      },
      onError: (dt) => {
        toast.error(dt?.message || "Something went wrong ,Kindly try again");
      },
    });
  }

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
            Recover Account
          </h2>
          <p className="mb-8 text-sm text-[rgb(151,137,205)]/90 text-left">
            Enter your phone number and we will send you a recovery code
          </p>

          {/* Form */}
          <form
            className="space-y-5 w-full"
            onSubmit={handleSubmit(submitData)}
          >
            {/* Phone Number */}
            <div>
              <label className="block text-sm text-[rgb(151,137,205)]/90 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+254 700 000 000"
                name="phone"
                {...register("phone", { required: true })}
                className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-sm placeholder-[rgb(151,137,205)]/90 outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>

            {/* Send Recovery Code Button */}

            <button
              type="submit"
              className="w-full bg-primary text-black font-bold py-3 rounded-md  hover:scale-105 transition-all text-center flex justify-center items-center"
            >
              {isLoading ? (
                <BounceLoading fill="#000" barHeight={12} />
              ) : (
                "Send Recovery Code"
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
      <div className="hidden md:flex w-1/2 h-screen relative">
        <img
          src="/side.png"
          alt="Advertisement"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
