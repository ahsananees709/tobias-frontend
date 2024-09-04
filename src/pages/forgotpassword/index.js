import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema } from "../../utils/formValidations";
import Loading from "../../components/Loading/loading";


function ForgotPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading,setLoading] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    setLoading(true)
    // Handle form submission
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <Loading />
        </div>
      )}
    <div className={`flex items-center min-h-[80vh] justify-center ${
          loading ? "blur-sm" : ""
        }`}>
      <div  className="relative 
          w-full h-full 
          md:w-auto md:h-auto 
          m-0 md:m-6 
          space-y-6 
          bg-white/80 
          shadow-2xl 
          rounded-none md:rounded-2xl 
          border-0 md:border-2 border-gray-100">
        <div className="rounded flex flex-col justify-center p-4 md:p-14">
          <h3 className="font-mono text-3xl font-bold text-slate-700 text-center">
            Reset Password
          </h3>
          <span className="font-serif text-gray-400 text-center mb-6">
            Please enter a new password
          </span>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col py-3">
              <label htmlFor="password" className="font-serif mb-2 text-md font-semibold text-gray-700">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`font-serif w-full p-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md placeholder:font-light placeholder:text-gray-500 pr-10`}
                  />
                )}
              />
              {errors.password && (
                <span className="font-serif text-sm text-red-600 font-semibold">
                  {errors.password.message}
                </span>
              )}
              <button
                type="button"
                className={`absolute inset-y-0 right-0 flex items-center px-3 ${errors.password ? "pt-3" : "pt-8"}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            <div className="relative flex flex-col py-3">
              <label htmlFor="confirmPassword" className="font-serif mb-2 text-md font-semibold text-gray-700">
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className={`font-serif w-full p-2 border ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded-md placeholder:font-light placeholder:text-gray-500 pr-10`}
                  />
                )}
              />
              {errors.confirmPassword && (
                <span className="font-serif text-sm text-red-600 font-semibold">
                  {errors.confirmPassword.message}
                </span>
              )}
              <button
                type="button"
                className={`absolute inset-y-0 right-0 flex items-center px-3 ${errors.confirmPassword ? "pt-3" : "pt-8"}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-gray-800"
            >
              Reset Password
            </button>
          </form>

          <div className="flex  sm:w-[500px] py-2 mb-4">
          <div className="mr-24">
                {/* <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember for 30 days</span> */}
              </div>
              <div className="text-center text-gray-700">
              Don't have an account?
              <Link
                to="/signup"
                className="font-sans ml-2 font-bold text-black hover:text-gray-600"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
  );
}

export default ForgotPasswordPage;
