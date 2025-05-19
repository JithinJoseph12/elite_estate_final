import commonAPI from "./commonAPI";
import SERVER_URL from "./serverUrl";
// import axios from "axios";
// registerr
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST", `${SERVER_URL}/register`,reqBody)
}

// loginn
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST", `${SERVER_URL}/login`,reqBody)
}
//updateProfile
export const updateUserAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/profile`, reqBody, reqHeader)
  }

//createListingAPI
export const createListingAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/listings`, reqBody, reqHeader);
  };

//fetch userAllListingAPI
export const userListingAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/user-listings`,{}, reqHeader);
  };

//deleteListingAPI in showListing
export const deleteListingAPI = async (listingId, reqHeader) => {
    return await commonAPI('DELETE', `${SERVER_URL}/listing-delete/${listingId}`, null, reqHeader);
  };

// Update listing in showListing
export const updateListingAPI = async (listingId, reqBody, reqHeader) => {
  return await commonAPI('PUT', `${SERVER_URL}/listings/${listingId}`, reqBody, reqHeader);
};

// Get listing by ID
// getListingByIdAPI
export const getListingByIdAPI = async (listingId) => {
  return await commonAPI("GET", `${SERVER_URL}/listings/${listingId}`);
};
// getAllListingsAPI
// export const getAllListingsAPI = async (queryParams = {}) => {
//   try {
//     const queryString = new URLSearchParams(queryParams).toString();
//     const response = await axios.get(`${SERVER_URL}/api/listings?${queryString}`);
//     return response;
//   } catch (error) {
//     console.error("Error fetching listings", error);
//     return { status: 500, message: "Error fetching listings" };
//   }
// };



