import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext";

import { RegisterUserInterface } from "../models/user";

import * as UsersApi from "../network/users_api";

import { UnauthNavbar } from "../components/UnauthNavbar";

const Register = () => {
  const { setAuthUser } = useAuthContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserInterface>();

  const onSubmit = async (input: RegisterUserInterface) => {
    try {
      const registerResponse = await UsersApi.registerUser(input);

      setAuthUser(registerResponse);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error message:", error.message);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen">
      <UnauthNavbar />

      <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
        <div className="w-[600px] flex flex-col gap-2">
          <h1 className="my-2 text-center text-3xl font-semibold">Register</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullname"
                className="input input-bordered flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullname", {
                    required: "Full Name is required.",
                  })}
                  className="w-full h-8 grow"
                />
              </label>
              {errors.fullname && (
                <span className="ml-4 text-red-500">
                  {errors.fullname?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="input input-bordered flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required." })}
                  className="w-full h-8 grow"
                />
              </label>
              {errors.email && (
                <span className="ml-4 text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="input input-bordered flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Full Name is required.",
                  })}
                  className="w-full h-8 grow"
                />
              </label>
              {errors.password && (
                <span className="ml-4 text-red-500">
                  {errors.password?.message}
                </span>
              )}
            </div>

            <div className="flex justify-center items-center gap-4">
              <button type="submit" disabled={isSubmitting} className="btn">
                Register
              </button>
            </div>
          </form>

          <p
            onClick={navigateToLogin}
            className="m-2 text-center cursor-pointer hover:text-white"
          >
            Already have an account? Login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
