import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SERVER_URL from "../services/serverUrl";
import { updateUserAPI, userListingAPI } from "../services/allAPI";
import ShowListing from "../components/ShowListing"; // Make sure the path is correct

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: ''
  });

  const [preview, setPreview] = useState("");
  const [existingProfileImg, setExistingProfileImg] = useState("");
  const [userListings, setUserListings] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      setUserDetails({
        username: user.username,
        email: user.email,
        password: user.password,
        profilePic: ''
      });
      setExistingProfileImg(user.profilePic);
    }
  }, []);

  useEffect(() => {
    if (userDetails.profilePic && typeof userDetails.profilePic !== "string") {
      setPreview(URL.createObjectURL(userDetails.profilePic));
    } else if (existingProfileImg) {
      setPreview(`${SERVER_URL}/uploads/${existingProfileImg}`);
    } else {
      setPreview("/default-avatar.jpg");
    }
  }, [userDetails.profilePic, existingProfileImg]);

  useEffect(() => {
    getUserListings();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const { username, email, password, profilePic } = userDetails;

    if (username && email && password) {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);

      if (profilePic && typeof profilePic !== "string") {
        reqBody.append("profilePic", profilePic);
      }

      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeaders = {
          Authorization: `Bearer ${token}`,
        };

        try {
          const result = await updateUserAPI(reqBody, reqHeaders);

          if (result.status === 200) {
            sessionStorage.setItem("user", JSON.stringify(result.data));

            setUserDetails({
              username: result.data.username,
              email: result.data.email,
              password: result.data.password,
              profilePic: "",
            });

            setExistingProfileImg(result.data.profilePic);
            setPreview(`${SERVER_URL}/uploads/${result.data.profilePic}`);
            alert("User profile updated successfully!");
          } else {
            alert("Update failed. Try again.");
          }
        } catch (err) {
          console.error("Error while updating user profile:", err);
          alert("Something went wrong while updating the profile!");
        }
      } else {
        alert("Please login again!");
      }
    } else {
      alert("Please fill out the form completely!");
    }
  };

  const getUserListings = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };
      try {
        const result = await userListingAPI(reqHeader);
        if (result.status === 200) {
          setUserListings(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container-fluid px-0" style={{backgroundColor: 'rgba(165, 172, 172, 0.678)', marginTop: '-5px',
        height: 'auto',
        padding: '30px 0'}}>
      <div className="container mt-5 mb-5">
        <h1 className="text-center mb-4 fw-bold">Profile</h1>
  
        <form onSubmit={handleUpdateProfile} className="mx-auto" style={{ maxWidth: '500px' }}>
          {/* Image Upload */}
          <div className="d-flex justify-content-center mb-3">
            <input
              type="file"
              hidden
              accept="image/*"
              ref={fileRef}
              onChange={e => setUserDetails({ ...userDetails, profilePic: e.target.files[0] })}
            />
            <img
              src={preview || "/default-avatar.jpg"}
              onClick={() => fileRef.current.click()}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "96px", height: "96px", objectFit: "cover", cursor: "pointer" }}
            />
          </div>
  
          {/* Input Fields */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Username"
              style={{ height: "50px" }}
              value={userDetails.username}
              onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              style={{ height: "50px" }}
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              style={{ height: "50px" }}
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              autoComplete="current-password"
            />
          </div>
  
          {/* Update Button */}
          <div className="mb-3 d-grid">
            <button
              type="submit"
              className="btn btn-dark btn-lg text-uppercase"
              style={{ height: "50px" }}
            >
              Update
            </button>
          </div>
  
          {/* Create Listing */}
          <div className="mb-4 d-grid">
            <Link
              to="/create-listing"
              className="btn btn-success btn-lg text-uppercase text-white text-center"
              style={{ height: "50px" }}
            >
              Create Listing
            </Link>
          </div>
        </form>
  
        {/* Delete/Sign out */}
        <div className="d-flex justify-content-between mt-4 mb-5 px-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <span className="text-danger fw-bold" role="button">Delete Account</span>
          <span className="text-danger fw-bold" role="button">Sign Out</span>
        </div>
  
        {/* User Listings */}
        <ShowListing userListings={userListings} setUserListings={setUserListings} />
      </div>
    </div>
  );
};

export default Profile;
