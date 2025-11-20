import { useContext, useMemo, useState } from "react";
import { assets } from "../assets/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState("Sign In");

  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const schema = useMemo(() => {
    return form === "Sign Up" ? registerSchema : loginSchema;
  }, [form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const handleFormSwitch = (newForm) => {
    setForm(newForm);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const isSignUp = form === "Sign Up";

      await toast.promise(
        axios.post(
          `${backendUrl}/api/auth/${isSignUp ? "register" : "login"}`,
          data
        ),
        {
          pending: isSignUp ? "Creating account..." : "Logging in...",
          success: isSignUp
            ? "Account created successfully!"
            : "Login successful!",
          error: {
            render({ data }) {
              return (
                data.response.data.message ||
                (isSignUp
                  ? "An error occurred while creating the account"
                  : "An error occurred while logging in.")
              );
            },
          },
        }
      );

      setIsLoggedin(true);
      getUserData();
      navigate("/");
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        toast.error("An unexpected error occurred, please try again");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute left-8 sm:left-24 exact-top w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {form === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center mb-6 text-sm">
          {form === "Sign Up" ? "Create your account" : "Login to your account"}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {form === "Sign Up" && (
            <div className="mb-6 relative">
              <label className="cursor-text flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Full Name"
                  className="bg-transparent outline-none"
                />
              </label>
              {errors.name && (
                <p className="text-red-500 text-xs ml-5 absolute -bottom-5">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div className="mb-6 relative">
            <label className="cursor-text flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} />
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none"
              />
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs ml-5 absolute -bottom-5">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-5 relative">
            <label className="cursor-text flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none"
              />
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs ml-5 absolute -bottom-5">
                {errors.password.message}
              </p>
            )}
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer w-fit"
          >
            Forgot password?
          </p>
          <button className="bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer w-full py-2.5 rounded-full">
            {form}
          </button>

          {form === "Sign Up" ? (
            <p className="flex gap-2 mt-4 justify-center text-xs text-gray-400">
              Already have an account?
              <span
                onClick={() => handleFormSwitch("Login")}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="flex gap-2 mt-4 justify-center text-xs text-gray-400">
              Don't have an account?
              <span
                onClick={() => handleFormSwitch("Sign Up")}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
