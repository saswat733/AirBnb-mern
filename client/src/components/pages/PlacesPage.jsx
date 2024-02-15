import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState({
    wifi: false,
    freeParking: false,
    metroPosition: false,
    laundryServices: false,
    tv: false,
    pets: false,
  });
  const [extraInfo, setExtraInfo] = useState("");
  const [checkin, setcheckin] = useState('')
  const [checkout, setcheckout] = useState('')
  const [maxtime, setmaxtime] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission
  };

  return (
    <>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex bg-pink-600 rounded-full items-center justify-center uppercase p-2 gap-2 hover:bg-white border border-solid "
            to={"/account/places/new"}
          >
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
      )}
      {action === "new" && (
        <div className="mt-4">
          <h1 className="text-center font-bold text-4xl uppercase">
            Add a new destination
          </h1>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col max-w-md mx-auto">
            <h2 className="text-xl mt-4">Title:</h2>
            <p className="text-gray-500 text-sm">
              Title for your place, should be short and classy.
            </p>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <h2 className="text-xl mt-4">Address:</h2>
            <p className="text-gray-500 text-sm">Address for your place.</p>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <h2 className="text-xl mt-4">Photos:</h2>
            <p className="text-gray-500 text-sm">Add some 4-5 photos.</p>
            <input
              type="file"
              placeholder="Photos"
              name="photos"
              onChange={(e) => setPhotos(e.target.files)}
            />

            <h2 className="text-xl mt-4">Description:</h2>
            <p className="text-gray-500 text-sm">Description for your place.</p>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Perks checkboxes */}
            <h2 className="text-xl mt-4">Perks:</h2>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                  <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
              <label htmlFor="" className="flex gap-3 items-center border border-solid p-2 m-1">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>

                <span className="text-gray-700 font-semibold"> wifi</span>
              </label>
              <label htmlFor="" className="flex gap-3 items-center border border-solid p-2 m-1">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>

                <span className="text-gray-700 font-semibold ">
                  {" "}
                  free parking
                </span>
              </label>
              <label htmlFor="" className="flex gap-3 items-center border border-solid p-2 m-1">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <span className="text-gray-700 font-semibold">
                  {" "}
                  metro position
                </span>
              </label>
              <label htmlFor="" className="flex gap-3 items-center border border-solid p-2 m-1">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <span className="text-gray-700 font-semibold">
                  {" "}
                  laundary services
                </span>
              </label>
              <label htmlFor="" className="flex gap-3 items-center border border-solid p-2 m-1">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path d="M19.5 6h-15v9h15V6Z" />
                  <path
                    fill-rule="evenodd"
                    d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span className="text-gray-700 font-semibold"> TV</span>
              </label>
              <label htmlFor="" className="flex gap-3 items-center border border-solid p-2 m-1">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>

                <span className="text-gray-700 font-semibold"> pets</span>
              </label>
            </div>

            </div>

            <h2 className="text-xl mt-4">Extra info:</h2>
            <p className="text-gray-500 text-sm">Extra information for your place.</p>
            <input
              type="text"
              placeholder="Extra info"
              name="extraInfo"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            {/* Check-in time */}
            <h2 className="text-xl mt-4">Check-in time:</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <h3>Check-in</h3>
                <input
                  type="text"
                  placeholder="Check-in time"
                  value={checkin}
                  onChange={(e) =>
                    setcheckin(e.target.value)
                  }
                />
              </div>
              <div>
                <h3>Check-out</h3>
                <input
                  type="text"
                  placeholder="Check-out time"
                  value={checkout}
                  onChange={(e) =>
                    setcheckout(e.target.value )
                  }
                />
              </div>
              <div>
                <h3>Max in time</h3>
                <input
                  type="text"
                  placeholder="Max in time"
                  value={maxtime}
                  onChange={(e) =>
                    setmaxtime(e.target.value)
                  }
                />
              </div>
            </div>

            <button className="primary my-3" type="submit">
              Add
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PlacesPage;
