import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/current-user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <header className="flex items-center gap-5 justify-between">
      {/* Your logo and navigation links */}
      <div className="flex items-center gap-2 justify-center border border-solid p-2 rounded-full">
        {/* Search icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={'1.5'}
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>

        {/* User profile */}
        {userData ? (
          <Link to="/home">
            <div className="group bg-gray-600 text-white rounded-full relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 group-hover:text-opacity-100 text-opacity-0 transition-opacity duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <h6 className="absolute border-2 rounded-lg p-4 uppercase text-black top-10 right-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{userData.username}</h6>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <div className="bg-gray-600 text-white rounded-full">
              <button className="p-2 uppercase font-mono">Login</button>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
