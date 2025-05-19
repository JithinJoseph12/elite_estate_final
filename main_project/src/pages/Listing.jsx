import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getListingByIdAPI } from "../services/allAPI";
import SERVER_URL from "../services/serverUrl";



const Listing = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

 useEffect(() => {
  const fetchListing = async () => {
    try {
      const result = await getListingByIdAPI(listingId);
      if (result.status === 200) {
        const updatedImageUrls = result.data.imageUrls.map(url =>
          url.startsWith("http") ? url : `${SERVER_URL}${url}`
        );
        setListing({ ...result.data, imageUrls: updatedImageUrls });
      } else {
        alert("Failed to fetch listing");
      }
    } catch (error) {
      console.error("Error fetching listing:", error);
      alert("Error fetching listing");
    }
  };

  if (listingId) fetchListing();
}, [listingId]);


  if (!listing) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main>
      <div className="container-fluid px-0" style={{backgroundColor: 'rgba(165, 172, 172, 0.678)', marginTop: '-5px',
        height: 'auto',
        padding: '30px 0'}}>
        {/* Image Slider */}
        <Swiper navigation modules={[Navigation]}>
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Share Button */}
        <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
          <FaShare className="text-slate-500" />
        </div>

        {/* Listing Details */}
        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
          <p className="text-2xl font-semibold">
            {listing.name} - $ {listing.regularPrice}
            {listing.type === "rent" && " / month"}
          </p>
          <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
            <FaMapMarkerAlt className="text-green-700" />
            {listing.address}
          </p>

          {/* Tags */}
          <div className="flex gap-4">
            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              For {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                ${listing.discountPrice} OFF
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-800">
            <span className="font-semibold text-black">Description - </span>
            {listing.description}
          </p>

          {/* Features */}
          <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
            <li className="flex items-center gap-1 whitespace-nowrap">
              <FaBed className="text-lg" /> {listing.bedrooms} Beds
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              <FaBath className="text-lg" /> {listing.bathrooms} Baths
            </li>
            {listing.parking && (
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" /> Parking spot
              </li>
            )}
            {listing.furnished && (
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" /> Furnished
              </li>
            )}
          </ul>

          {/* Contact Button */}
          <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
            Contact landlord
          </button>
        </div>
      </div>
    </main>
  );
};

export default Listing;
