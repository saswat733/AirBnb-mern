import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const AccountPage = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    // console.log(accessToken)
    const fetchUserData = async () => {
      try {
        if (accessToken) {
          const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          console.log(response.data.data);
          setUserData(response.data.data);
          // console.log(userData);
        } else {
          console.log('No access token available');
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="flex gap-8 justify-center mt-10 items-center">
      <NavLink
        to="/account"
        className="block duration-200 text-black border-b border-gray-100 hover:bg-gray-50 rounded-full lg:hover:bg-pink-600 lg:border-0 hover:text-orange-700 lg:px-4 py-2"
      >
        My Profile
      </NavLink>
      <NavLink 
        className="block px-4 duration-200 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-pink-600 rounded-full lg:border-0 hover:text-orange-700 lg:px-4 py-2"
        to="/account/bookings"
      >
        <div>My Bookings</div>
      </NavLink>
      <NavLink
        className="block  px-4 duration-200 text-black border-b border-gray-100 hover:bg-gray-50 rounded-full lg:hover:bg-pink-600 lg:border-0 hover:text-orange-700 lg:px-4 py-2"
        to="/account/places"
      >
        <div>Places</div>
      </NavLink>
      {userData && (
        <div>
          <h2>User Information</h2>
          <p>Name: {userData.fullname}</p>
          <p>Email: {userData.email}</p>
          {/* Add more user information fields as needed */}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
