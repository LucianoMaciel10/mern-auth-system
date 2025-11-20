import { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const [openSettings, setOpenSettings] = useState(false);
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const toggleOpenSettings = () =>
    setOpenSettings(openSettings === true ? false : true);

  const logout = async () => {
    try {
      await toast.promise(axios.post(backendUrl + "/api/auth/logout"), {
        pending: "Logging out...",
        success: {
          render({ data }) {
            return data.message || "Session successfully closed";
          },
        },
        error: {
          render({ data }) {
            return data.response.data.message || "Error closing session";
          },
        },
      });

      setIsLoggedin(false);
      setUserData(null);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  const sendVerificationOtp = async () => {
    try {
      await toast.promise(
        axios.post(backendUrl + "/api/auth/send-verify-otp"),
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

      navigate("/email-verify");
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} className="w-28 sm:w-32" />
      {userData ? (
        <div
          onClick={toggleOpenSettings}
          className="cursor-pointer rounded-full bg-black text-white flex justify-center items-center relative w-8 h-8 sm:w-10 sm:h-10"
        >
          {userData.name[0].toUpperCase()}
          <div
            className={`absolute ${
              !openSettings && "hidden"
            } top-0 right-0 z-10 text-black rounded pt-10 border-b-2 sm:top-2`}
          >
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 sm:py-2 sm:px-3 hover:bg-gray-200 cursor-pointer"
                >
                  Verify email
                </li>
              )}
              <li
                onClick={logout}
                className="py-1 px-2 pr-10 sm:py-2 sm:px-3 sm:pr-12 hover:bg-red-200 cursor-pointer bg-red-100"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-500 hover:bg-gray-100 transition-all cursor-pointer"
        >
          Login <img src={assets.arrow_icon} />
        </button>
      )}
    </nav>
  );
}

export default Navbar;
