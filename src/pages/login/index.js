import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../utils/AuthContext";
import { loginSchema } from "../../utils/formValidations";
import Loading from "../../components/Loading/loading";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await loginUser(data);
        navigate('/');
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <Loading /> {/* Your loading spinner component */}
        </div>
      )}
      <div
        className={`flex items-center min-h-screen justify-center ${
          loading ? "blur-sm" : ""
        }`}
      >
        <div
          className="relative 
          w-full h-full 
          md:w-auto md:h-auto 
          m-0 md:m-6 
          space-y-6 
          bg-form-color  
          shadow-4xl 
          rounded-none md:rounded-2xl 
          border-0 md:border-2 border-[#DFD3C3]"
        >
          {/* Form content */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded flex flex-col justify-center p-4 md:p-14"
          >
            <h3 className="font-mono text-2xl font-bold text-slate-700 text-center">
              Login to Your Account
            </h3>
            <span className="font-serif text-gray-400 text-center mb-6">
              Please enter your credentials
            </span>

            <div className="py-3">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-serif mb-2 text-lg font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  placeholder="Enter your email"
                  type="text"
                  className={`font-serif w-full p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder:font-light placeholder:text-gray-500`}
                  name="email"
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="font-serif text-sm text-red-600 font-semibold">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="relative flex flex-col py-3">
              <label
                htmlFor="password"
                className="font-serif mb-2 text-lg font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={`font-serif w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md placeholder:font-light placeholder:text-gray-500 pr-10`}
                {...register("password")}
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

            <div className="flex justify-between sm:w-[500px] py-2 mb-4">
              {/* <Link
                to="/forgotpassword"
                className="font-sans ml-2 font-bold text-black hover:text-gray-600"
              >
                Forgot password?
              </Link> */}
            </div>
            <button
              className="w-full bg-btn-color font-bold text-black p-2 rounded-lg mb-6 hover:bg-btn-color-hover hover:text-btn-text-color-hover"
              type="submit"
              disabled={loading} // Disable button when loading
            >
              Login
            </button>
            <div className="text-center text-gray-700">
              Don't have an account?
              <Link
                to="/signup"
                className="font-sans ml-2 font-bold text-black hover:text-gray-600"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
