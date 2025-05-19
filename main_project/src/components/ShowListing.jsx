import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SERVER_URL from "../services/serverUrl";
import { deleteListingAPI } from '../services/allAPI';

const ShowListing = ({ userListings, setUserListings }) => {
  const [showListings, setShowListings] = useState(false); // ⬅️ state to toggle view

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeaders = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await deleteListingAPI(id, reqHeaders);
        if (result.status === 200) {
          alert("Listing deleted successfully");
          setUserListings(prev => prev.filter(listing => listing._id !== id)); // update UI
        }
      } catch (err) {
        alert("Error deleting listing");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Show Listings button */}
      <button
        className='text-green-700 w-full font-semibold'
        onClick={() => setShowListings(prev => !prev)}
      >
        {showListings ? "Hide Listings" : "Show Listings"}
      </button>

      {/* Conditionally show listing section */}
      {showListings && (
        <>
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>

          {userListings.length === 0 ? (
            <p className="text-center text-gray-500">You have no listings yet.</p>
          ) : (
            userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={
                      listing.imageUrls && listing.imageUrls.length > 0
                        ? `${SERVER_URL}${listing.imageUrls[0]}`
                        : "/default-avatar.jpg"
                    }
                    alt="listing cover"
                    className="h-16 w-16 object-cover rounded"
                  />
                </Link>

                <Link
                  className="text-slate-700 font-semibold hover:underline truncate flex-1 ml-2"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col items-center gap-1">
                  <button
                    className="text-red-700 uppercase text-sm"
                    onClick={() => handleDelete(listing._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase text-sm">Edit</button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ShowListing;
