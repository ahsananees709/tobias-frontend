import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cities, rentalPrices, bedrooms, surfaces, notification } from "../../utils/constants";
import { step1SignupSchema, step2SignupSchema, step3SignupSchema } from "../../utils/formValidations";
import Loading from "../../components/Loading/loading";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      step === 1 ? step1SignupSchema : step === 2 ? step2SignupSchema : step3SignupSchema
    ),
  });


  const handleNextStep = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;
  
    if (step < 3) {
      setStep(step + 1);
    } else {
      const { confirmPassword, ...filteredData } = data;
      setLoading(true);
      try {
        const response = await axiosInstance.post('/user/signup/', filteredData);
  
        if (response) {
          notification("User has been registered successfully!.Please signin to your account with your registered email address.")
          navigate('/login')
        } else {
          notification(`Signup failed: ${response.statusText}`,"error" );
        }
      } catch (error) {
        notification("An error occurred during signup:", "error");
      } finally {
        setLoading(false);
      }
    }
  };
  

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <Loading />
        </div>
      )}
      <div className={`flex items-center min-h-[80vh] justify-center ${loading ? "blur-sm" : ""}`}>
        <div className="relative m-6 space-y-6 bg-white shadow-4xl rounded-2xl md:space-y-0 border-2 border-[#DFD3C3] w-full max-w-lg">
          <div className="bg-form-color rounded flex flex-col justify-center p-4 md:p-14">
            <h3 className="font-mono text-2xl font-bold text-slate-700 text-center">
              Register Your Account
            </h3>
            <span className="font-serif text-gray-400 text-center mb-6">
              {step === 1 ? "Select Your City" : step === 2 ? "Select Your Preferences" : "Enter Your Details"}
            </span>

            <form onSubmit={handleSubmit(handleNextStep)}>
              {step === 1 && (
                <div className="py-3">
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`font-serif w-full p-2 border ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        } rounded-md bg-white`}
                      >
                        <option value="">Select a city</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.city && (
                    <span className="font-serif text-sm text-red-600 font-semibold">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              )}

              {step === 2 && (
                <>
                  <div className="py-3">
                    <Controller
                      name="max_price"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`font-serif w-full p-2 border ${
                            errors.max_price ? "border-red-500" : "border-gray-300"
                          } rounded-md bg-white`}
                        >
                          <option value="">Select max rental price (€)</option>
                          {rentalPrices.map((price, index) => (
                            <option key={index} value={price}>
                              €{price}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.max_price && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.max_price.message}
                      </span>
                    )}
                  </div>

                  <div className="py-3">
                    <Controller
                      name="no_of_rooms"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`font-serif w-full p-2 border ${
                            errors.no_of_rooms ? "border-red-500" : "border-gray-300"
                          } rounded-md bg-white`}
                        >
                          <option value="">Select number of bedrooms</option>
                          {bedrooms.map((bedroom, index) => (
                            <option key={index} value={bedroom}>
                              {bedroom}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.no_of_rooms && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.no_of_rooms.message}
                      </span>
                    )}
                  </div>

                  <div className="py-3">
                    <Controller
                      name="area"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`font-serif w-full p-2 border ${
                            errors.area ? "border-red-500" : "border-gray-300"
                          } rounded-md bg-white`}
                        >
                          <option value="">Select minimum surface (m²)</option>
                          {surfaces.map((surface, index) => (
                            <option key={index} value={surface}>
                              {surface}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.area && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.area.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="py-3">
                    <input
                      placeholder="First Name"
                      type="text"
                      className={`font-serif w-full p-2 border ${
                        errors.firstname ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      {...register("f_name")}
                    />
                    {errors.f_name && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.f_name.message}
                      </span>
                    )}
                  </div>

                  <div className="py-3">
                    <input
                      placeholder="Last Name"
                      type="text"
                      className={`font-serif w-full p-2 border ${
                        errors.lastname ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      {...register("l_name")}
                    />
                    {errors.l_name && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.l_name.message}
                      </span>
                    )}
                  </div>

                  <div className="py-3">
                    <input
                      placeholder="Email"
                      type="email"
                      className={`font-serif w-full p-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="py-3">
                    <input
                      placeholder="Phone number (optional)"
                      type="tel"
                      className={`font-serif w-full p-2 border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="relative flex flex-col py-3">
                    <input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={`font-serif w-full p-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                    />
                    {errors.password && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.password.message}
                      </span>
                    )}
                    <button
                      type="button"
                      className={`absolute inset-y-0 right-0 flex items-center ${
                        errors.password ? "px-5 pb-14" : "px-5 "
                      }`}
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
                    <input
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      className={`font-serif w-full p-2 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                    />
                    {errors.confirmPassword && (
                      <span className="font-serif text-sm text-red-600 font-semibold">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                    <button
                      type="button"
                      className={`absolute inset-y-0 right-0 flex items-center ${
                        errors.confirmPassword ? "px-5 pb-5" : "px-5 "
                      }`}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    className="bg-btn-color font-bold text-btn-text-color p-2 rounded-lg w-1/3 hover:bg-btn-color-hover hover:text-btn-text-color-hover"
                    type="button"
                    onClick={handleBackStep}
                  >
                    Back
                  </button>
                )}
                <button
                  className="bg-btn-color font-bold text-btn-text-color p-2 rounded-lg hover:bg-btn-color-hover hover:text-btn-text-color-hover w-full ml-4"
                  type="submit"
                >
                  {step === 3 ? "Register" : "Next"}
                </button>
              </div>
            </form>

            {step === 3 && (
              <div className="text-center text-gray-400 mt-4">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-2 font-bold text-black hover:text-gray-600"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
