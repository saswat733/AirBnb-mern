import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const PlacesPage = () => {
    const {action}=useParams()
   
  return (
    <>
    {
        action!=='new' && (
            <div className="text-center">
        <Link className="inline-flex bg-pink-600 rounded-full items-center justify-center uppercase p-2 gap-2 hover:bg-white border border-solid " to={'/account/places/new'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          add new places
        </Link>
      </div>
        )
    }
    {
        action==='new' && (
            <div className="mt-4">
      <h1 className="text-center font-bold text-4xl uppercase">Login</h1>
      <form action="submit" className="flex flex-col max-w-md mx-auto">
        <h2 className="text-xl mt-4">Title:</h2>
        <p className="text-gray-500 text-sm">Title for your place , should be short and classy.</p>
        <input type="text" placeholder="title"  />
       
        <h2 className="text-xl mt-4">Address:</h2>
        <p className="text-gray-500 text-sm">Address for your place.</p>
        <input type="text" placeholder="address"  />

        <h2 className="text-xl mt-4">Photos:</h2>
        <p className="text-gray-500 text-sm">Add some 4-5 photos.</p>
        <input type="image" placeholder="image"  />
     
        <button className="primary">add</button>

        
      </form>
    </div>
        )
    }
      
    </>
  );
};

export default PlacesPage;
