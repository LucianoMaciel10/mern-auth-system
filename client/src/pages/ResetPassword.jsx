import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newPasswordSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema.js";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const emailForm = useForm({ resolver: zodResolver(resetPasswordSchema) });
  const passwordForm = useForm({ resolver: zodResolver(newPasswordSchema) });
  const navigate = useNavigate();

  const inputsRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputsRefs.current.length - 1) {
      inputsRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputsRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputsRefs.current[index]) {
        inputsRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (data) => {
    try {
      await toast.promise(
        axios.post(backendUrl + "/api/auth/send-reset-otp", data),
        {
          pending: "Sending the email...",
          success: {
            render({ data }) {
              return data.data.message || "Email sent successfully!";
            },
          },
          error: {
            render({ data }) {
              return data.response.data.message || "The email failed to send";
            },
          },
        }
      );

      setEmail(data.email);
      setIsEmailSent(true);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputsRefs.current.map((e) => e.value);
    const otp = otpArray.join("");

    try {
      await toast.promise(
        axios.post(backendUrl + "/api/auth/verify-reset-otp", { email, otp }),
        {
          pending: "Verifying OTP...",
          success: {
            render({ data }) {
              return data.data.message || "Email successfully verified!";
            },
          },
          error: {
            render({ data }) {
              return data.response.data.message || "OTP verification failed";
            },
          },
        }
      );

      setIsOtpSubmited(true);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  const onSubmitNewPassword = async (data) => {
    const { newPassword } = data;
    
    try {
      await toast.promise(
        axios.post(backendUrl + "/api/auth/reset-password", {email, newPassword}),
        {
          pending: "Changing the password...",
          success: {
            render({ data }) {
              return data.data.message || "The password was successfully changed!"; 
            },
          },
          error: {
            render({ data }) {
              console.log(data);
              
              return data.response.data.message || "Error changing password";
            },
          },
        }
      );

      navigate('/login')
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        toast.error("An unexpected error occurred. Please try again.");
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
      {!isEmailSent && (
        <form
          onSubmit={emailForm.handleSubmit(onSubmitEmail)}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-indigo-300 text-center mb-6">
            Enter your registered email address
          </p>
          <label className="cursor-text relative mb-7 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} className="w-3 h-3" />
            <input
              {...emailForm.register("email")}
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none text-white"
            />
            {emailForm.formState.errors.email && (
              <p className="text-red-500 text-xs ml-5 absolute -bottom-5">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </label>
          <button className="bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer w-full py-2.5 rounded-full">
            Submit
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmited && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-indigo-300 text-center mb-6">
            Enter the 6-digit code sent to your email
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength={1}
                  key={index}
                  required
                  ref={(e) => (inputsRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                />
              ))}
          </div>
          <button className="bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer w-full py-2.5 rounded-full">
            Submit
          </button>
        </form>
      )}

      {isEmailSent && isOtpSubmited && (
        <form
          onSubmit={passwordForm.handleSubmit(onSubmitNewPassword)}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-indigo-300 text-center mb-6">
            Entre the new password below
          </p>
          <label className="cursor-text relative mb-7 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} className="w-3 h-3" />
            <input
              {...passwordForm.register("newPassword")}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white"
            />
            {passwordForm.formState.errors.newPassword && (
              <p className="text-red-500 text-xs ml-5 absolute -bottom-5">
                {passwordForm.formState.errors.newPassword.message}
              </p>
            )}
          </label>
          <button className="bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer w-full py-2.5 rounded-full">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
