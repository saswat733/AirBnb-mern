import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation,Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PlacesPage from "../pages/PlacesPage";
import Places from "./Places";

const AccountPage = () => {
  const [userData, setUserData] = useState({});
  const {pathname}=useLocation();
  const [redirect, setredirect] = useState(false)
  const navigate = useNavigate(); // Initialize the navigate function

  let subPage= pathname.split('/')?.[2];
  if(subPage===undefined){
    subPage='profile';
  }

  function linkClasses (type=null) {
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
    if (type === subPage) {
      classes += ' bg-pink-600 text-black';
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  }


  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if(!accessToken){
      navigate('/login')
    }
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

  const HandleLogOut = async () => {
    const accessToken = Cookies.get('accessToken');
    

    try {
        if (accessToken) {
            const response = await axios.post(
                'http://localhost:8000/api/v1/users/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            console.log(response);
            console.log('User logged out successfully');

            // Remove accessToken from Cookies
            Cookies.remove('accessToken');

            // Remove accessToken from localStorage
            localStorage.removeItem('accessToken');

            // Redirect to login page
            navigate('/login');
        } else {
            console.log('No access token available.');
        }
    } catch (error) {
        console.log('Error logging out:', error);
    }
};

 
  if(redirect){
    return <Navigate to={'/login'}/>
  }
  
  return (
    <div>
     <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses('profile')} to={'/account'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        My profile
      </Link>
      <Link className={linkClasses('bookings')} to={'/account/bookings'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        My bookings
      </Link>
      <Link className={linkClasses('places')} to={'/account/places'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
        </svg>
        My accommodations
      </Link>
    </nav>
    {
      subPage==='profile' && (
        <div className="flex flex-col justify-center items-center  border border-solid bg-pink-600 min-h-96 max-w-96 m-auto rounded-lg">
          <div className="border-solid border-b flex justify-center gap-2  border-gray-400 text-center text-xl mt-4 ">
            <h4 className="font-bold uppercase">Full name :</h4> {userData.fullname}
          </div>
          <div className="border-solid border-b flex justify-center gap-2  border-gray-400 text-center text-xl mt-4 ">
            <h4 className="font-bold uppercase"> username :</h4> {userData.username}
          </div>
          <div className="border-solid border-b flex justify-center gap-2  border-gray-400 text-center text-xl mt-4 ">
            <h4 className="font-bold uppercase">email Id :</h4> {userData.email}
          </div>
          <button className="w-9/12 mt-32 bg-white text-black p-4 rounded-full font-bold uppercase" onClick={HandleLogOut}>log out</button>
        </div>
      )
    }
    {
      subPage==='places' && (
        <Places/>
      )
    }
    </div>
    
  );
};

export default AccountPage;
