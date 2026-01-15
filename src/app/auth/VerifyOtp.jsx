import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BounceLoading } from "respinner";
import { useActivateAccount, useResendOTP } from "../../hooks/useAuth";
import { useBanner } from "../../context/BannerContext";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";
  const { showBanner } = useBanner();
  const { handleSubmit, register } = useForm();
  const [resendTimer, setResendTimer] = useState(30);

  // Hooks from your service
  const { activateAccountFn, isLoading: isVerifying } = useActivateAccount();
  const { resendOTPFn, isLoading: isResending } = useResendOTP();

  // Countdown for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Submit OTP
  function submitOtp(data) {
    activateAccountFn(
      { code: data.otp, phone },
      {
        onSuccess: (res) => {
          if (res?.status) {
            toast.success("OTP Verified Successfully");

            // ✅ Make sure both token + user are stored
            const userData = {
              token: res?.token, // include token like in login/register
              ...res.user,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            navigate("/");

            // ✅ Trigger banner popup
            if (res?.banner?.showBanner) {
              showBanner(res?.banner?.currentBanner || "registration");
            }
          } else {
            toast.error(res?.message || "Invalid OTP");
          }
        },
        onError: (err) => {
          toast.error(err?.message || "Verification failed");
        },
      }
    );
  }

  // Resend OTP
  function resendOtp() {
    resendOTPFn(
      { phone },
      {
        onSuccess: (res) => {
          if (res?.status) {
            toast.success("OTP resent successfully");
            setResendTimer(90); // reset countdown
          } else {
            toast.error(res?.message || "Could not resend OTP");
          }
        },
        onError: (err) => {
          toast.error(err?.message || "Resend failed");
        },
      }
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-background text-[rgb(151,137,205)]/90">
      <div className="flex flex-col w-full md:w-1/2 bg-secondary relative px-6 sm:px-12 lg:px-20">
        {/* Header */}
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

        {/* Body */}
        <div className="flex flex-col flex-grow justify-start max-w-md mx-auto w-full sm:mt-10">
          <h2 className="text-3xl font-bold mt-10 mb-2 text-left">
            Verify OTP
          </h2>
          <p className="mb-8 text-sm text-[rgb(151,137,205)]/90 text-left">
            Enter the 6-digit code sent to{" "}
            <span className="text-primary font-semibold">{phone}</span>
          </p>

          {/* OTP Form */}
          <form
            onSubmit={handleSubmit(submitOtp)}
            className="space-y-5 w-full mt-10 lg:mt-0"
          >
            <div>
              <label className="block text-sm text-[rgb(151,137,205)]/90 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                maxLength="6"
                placeholder="******"
                {...register("otp", { required: true })}
                className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-center text-lg tracking-widest placeholder-[rgb(151,137,205)]/90 outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-primary text-black font-bold mt-10 py-3 rounded-md shadow-lg hover:shadow-yellow-500/40 hover:scale-105 transition-all flex justify-center items-center"
            >
              {isVerifying ? (
                <BounceLoading fill="#000" barHeight={12} />
              ) : (
                "Verify Code"
              )}
            </button>
          </form>

          {/* Resend Section */}
          <div className="mt-6 flex justify-between items-center text-sm text-[rgb(151,137,205)]/90">
            <span>
              Didn’t get the code?{" "}
              {resendTimer > 0 ? (
                <span className="text-primary">Resend in {resendTimer}s</span>
              ) : (
                <button
                  onClick={resendOtp}
                  disabled={isResending}
                  className="text-primary hover:underline"
                >
                  {isResending ? "Resending..." : "Resend Code"}
                </button>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/side.png')" }}
      ></div>
    </div>
  );
}
