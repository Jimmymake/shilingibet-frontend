import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BounceLoading } from "respinner";
import { useBanner } from "../../context/BannerContext";

export default function Register() {
  const [showReferral, setShowReferral] = useState(true);
  const [referral, setReferral] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { showBanner } = useBanner();
  const { registerFn, isLoading } = useRegister();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Auto-extract referral code from ?ref=... in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setReferral(params.get("ref") || "");
  }, [location]);

  // Normalize Kenyan phone number
  function normalizeKenyanPhoneClient(input = "") {
    const digits = String(input).replace(/\D/g, "");
    if (digits.startsWith("2547") && digits.length === 12)
      return `0${digits.slice(3)}`;
    if (digits.startsWith("7") && digits.length === 9) return `0${digits}`;
    if (digits.startsWith("07") && digits.length === 10) return digits;
    return input;
  }

  async function submitData(data) {
    const phone = normalizeKenyanPhoneClient(data.phone);

    registerFn(
      { ...data, phone, referralCode: referral || "" },
      {
        onSuccess: (response) => {
          if (response?.status) {
            const userData = { token: response?.token, ...response?.user };
            localStorage.setItem("user", JSON.stringify(userData));

            // ✅ Trigger banner popup via context
            if (response?.banner?.showBanner) {
              showBanner(response?.banner?.currentBanner || "registration");
            }

            if (response?.user?.isActive) {
              toast.success(
                response?.message || "Account created successfully"
              );
              navigate("/");
            } else {
              navigate("/verify", { state: { phone: response?.user?.phone } });
            }
          } else {
            toast.error(response?.message || "Registration failed");
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Something went wrong");
        },
      }
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-background text-[rgb(151,137,205)]/90">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-1/2 bg-secondary relative px-6 sm:px-12 lg:px-20">
        {/* Header with Logo & Close */}
        <div className="flex justify-between items-start pt-6">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="w-32 sm:w-40" />
          </Link>
          <button onClick={() => navigate(-1)}>
            <IoMdClose
              size={28}
              className="bg-[rgb(151,137,205)]/20 rounded-full p-1 text-[rgb(151,137,205)] cursor-pointer"
            />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-grow justify-start max-w-md mx-auto w-full sm:mt-10">
          <h2 className="text-3xl font-bold mt-10 mb-2 text-left">
            Create your account
          </h2>
          <p className="mb-8 text-sm text-left">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-primary cursor-pointer hover:underline">
                Login
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
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                inputMode="tel"
                maxLength="13"
                placeholder="0700 000 000"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(\+254|0)?7\d{8}$/,
                    message: "Enter a valid Kenyan phone number",
                  },
                })}
                className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-sm placeholder-[rgb(151,137,205)]/90 outline-none focus:ring-2 focus:ring-primary transition"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: 6,
                  })}
                  className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-sm placeholder-[rgb(151,137,205)]/90 outline-none focus:ring-2 focus:ring-primary transition"
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-3 cursor-pointer hover:text-gray-200"
                >
                  {passwordVisible ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
              <p className="text-xs mt-1">
                Password must be at least 6 characters
              </p>
            </div>

            {/* Referral Code */}
            <div>
              <button
                type="button"
                onClick={() => setShowReferral(!showReferral)}
                className="flex items-center gap-2 text-sm hover:underline"
              >
                Referral Code (Optional){" "}
                {showReferral ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showReferral && (
                <div className="relative mt-3">
                  <input
                    type="text"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                    placeholder="Referral Code"
                    className="w-full bg-secondary/40 text-[rgb(151,137,205)]/90 border-2 border-primary/70 rounded-md px-4 py-3 text-sm placeholder-[rgb(151,137,205)]/90 outline-none focus:ring-2 focus:ring-primary transition"
                  />
                  {referral && (
                    <IoMdClose
                      size={20}
                      className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-red-500"
                      onClick={() => setReferral("")}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-1 accent-primary w-4 h-4"
              />
              <label className="leading-snug">
                I am 18+ and have read and accept the{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  Privacy Policy
                </span>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isChecked}
              className={`w-full font-bold py-3 rounded-md shadow-lg flex justify-center items-center ${
                isChecked
                  ? "bg-primary text-black hover:shadow-yellow-500/40 hover:scale-105"
                  : "bg-primary/50 text-black cursor-not-allowed"
              }`}
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
        <p className="text-xs text-[rgb(151,137,205)]/90 mb-6 text-center mt-auto">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </div>

      {/* Right Section */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative object-fill"
        style={{ backgroundImage: "url('/side.png')" }}
      />
    </div>
  );
}
